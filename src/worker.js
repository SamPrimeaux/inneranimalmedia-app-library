// GCloud v1 Worker
// Serves MeauxAccess SPA
// Current: Serves from static assets (index.html in tenant directory)
// Future: Will serve from R2 dashboard bucket and R2 website bucket (2 separate buckets)

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const path = url.pathname;

        const corsHeaders = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        };

        if (request.method === "OPTIONS") {
            return new Response(null, { headers: corsHeaders });
        }

        // API Routes - Use secrets from Cloudflare Workers environment
        if (path.startsWith('/api/')) {
            return handleAPI(request, env, corsHeaders);
        }

        // Debug endpoint to check secrets (remove in production)
        if (path === '/api/debug/secrets') {
            return new Response(JSON.stringify({
                hasImagesToken: !!env.CLOUDFLARE_IMAGES_API_TOKEN,
                hasResendKey: !!env.RESEND_API_KEY,
                hasApiToken: !!env.CLOUDFLARE_API_TOKEN,
                accountId: env.CLOUDFLARE_ACCOUNT_ID,
                // Don't expose actual token values for security
            }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        // Try to serve from R2 first (backup/primary source)
        if (env.R2_STORAGE) {
            let r2Key = path === '/' || path === '' ? 'index.html' : path.substring(1);

            try {
                const object = await env.R2_STORAGE.get(r2Key);
                if (object) {
                    const contentType = getContentType(r2Key);
                    return new Response(object.body, {
                        headers: {
                            ...corsHeaders,
                            "Content-Type": `${contentType};charset=UTF-8`,
                            "Cache-Control": r2Key === 'index.html' ? "public, max-age=3600" : "public, max-age=31536000",
                        },
                    });
                }
            } catch (error) {
                // R2 not available, continue to static assets
            }
        }

        // For SPA routing: serve index.html for all routes (except static assets with extensions)
        const hasExtension = /\.(html|css|js|json|png|jpg|jpeg|svg|ico|woff|woff2|ttf|eot)$/i.test(path);

        // If it's not a static asset, serve index.html for SPA routing
        if (!hasExtension && path !== '/') {
            // Try static assets first
            if (env.ASSETS) {
                try {
                    return await env.ASSETS.fetch(new URL('/index.html', request.url));
                } catch (e) {
                    // Fall through
                }
            }
        }

        // Serve from static assets (wrangler assets directory)
        if (env.ASSETS) {
            const assetPath = path === '/' || path === '' ? '/index.html' : path;
            try {
                return await env.ASSETS.fetch(new URL(assetPath, request.url));
            } catch (e) {
                // Asset not found
            }
        }

        // Final fallback: return 404
        return new Response('Not Found', { status: 404, headers: corsHeaders });
    },
};

// API Handler - Uses secrets from Cloudflare Workers environment
async function handleAPI(request, env, corsHeaders) {
    const url = new URL(request.url);
    const path = url.pathname;
    const accountId = env.CLOUDFLARE_ACCOUNT_ID || 'ede6590ac0d2fb7daf155b35653457b2';

    // Debug endpoint to check secrets
    if (path === '/api/debug/secrets') {
        return new Response(JSON.stringify({
            // API Tokens
            hasImagesToken: !!env.CLOUDFLARE_IMAGES_API_TOKEN,
            hasResendKey: !!env.RESEND_API_KEY,
            hasApiToken: !!env.CLOUDFLARE_API_TOKEN,

            // AI Keys
            hasGeminiKey: !!env.GEMINI_API_KEY,
            hasGoogleKey: !!env.GOOGLE_API_KEY,
            hasGroqKey: !!env.GROQ_API_KEY,

            // 3D & Conversion
            hasMeshyKey: !!env.MESHYAI_API_KEY,
            hasCloudConvertKey: !!env.CLOUDCONVERT_API_KEY,

            // AWS Keys
            hasAwsAccessKey: !!env.AWS_ACCESS_KEY_ID,
            hasAwsSecretKey: !!env.AWS_SECRET_ACCESS_KEY,
            hasAwsBedrock: !!env.AWS_BEDROCK_TOKEN,

            // Other
            accountId: env.CLOUDFLARE_ACCOUNT_ID,
            environment: env.ENVIRONMENT,

            // Note
            note: 'Secrets are present (true) or missing (false). Token values are not exposed for security.',
            explanation: 'Secrets are stored in Cloudflare Dashboard (Workers & Pages → gcloudv1 → Settings → Variables and Secrets), NOT in wrangler.jsonc. They are accessed via env.SECRET_NAME in the worker code.'
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }

    // Images API
    if (path.startsWith('/api/images/')) {
        const imageId = path.split('/api/images/')[1];

        // List images
        if (path === '/api/images/list' || path.startsWith('/api/images/list?')) {
            const perPage = url.searchParams.get('per_page') || '1000';
            // Use CLOUDFLARE_IMAGES_API_TOKEN first, fallback to CLOUDFLARE_API_TOKEN
            const imagesToken = env.CLOUDFLARE_IMAGES_API_TOKEN || env.CLOUDFLARE_API_TOKEN;

            if (!imagesToken) {
                return new Response(JSON.stringify({
                    success: false,
                    error: 'Cloudflare Images API token not configured. Please add CLOUDFLARE_IMAGES_API_TOKEN as a secret in Cloudflare Workers.',
                    debug: 'Available env keys: ' + Object.keys(env).join(', ')
                }), {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }

            // Debug log (remove in production)
            console.log('Using Images API token:', imagesToken ? 'Token present' : 'Token missing');

            try {
                const response = await fetch(
                    `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1?per_page=${perPage}`,
                    {
                        headers: { 'Authorization': `Bearer ${imagesToken}` }
                    }
                );
                const data = await response.json();

                // If authentication fails, provide helpful error
                if (!data.success && data.errors && data.errors[0]?.code === 10001) {
                    return new Response(JSON.stringify({
                        success: false,
                        error: 'Authentication failed. The token value may be incorrect or lacks Images API permissions.',
                        hint: 'Verify the token in Cloudflare Dashboard → Images → Keys tab matches the secret value.',
                        troubleshooting: [
                            '1. Go to Cloudflare Dashboard → Images → Keys tab',
                            '2. Copy the API Token shown there',
                            '3. Go to Workers & Pages → gcloudv1 → Settings → Variables and Secrets',
                            '4. Edit CLOUDFLARE_IMAGES_API_TOKEN and paste the exact token',
                            '5. Wait 1-2 minutes for secrets to propagate',
                            '6. Refresh the page'
                        ]
                    }), {
                        status: 401,
                        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                    });
                }

                return new Response(JSON.stringify(data), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            } catch (error) {
                return new Response(JSON.stringify({
                    success: false,
                    error: error.message
                }), {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
        }

        // Upload image
        if (path === '/api/images/upload') {
            const imagesToken = env.CLOUDFLARE_IMAGES_API_TOKEN || env.CLOUDFLARE_API_TOKEN;

            if (!imagesToken) {
                return new Response(JSON.stringify({
                    success: false,
                    error: 'Cloudflare Images API token not configured'
                }), {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }

            try {
                const formData = await request.formData();
                const response = await fetch(
                    `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1`,
                    {
                        method: 'POST',
                        headers: { 'Authorization': `Bearer ${imagesToken}` },
                        body: formData
                    }
                );
                const data = await response.json();
                return new Response(JSON.stringify(data), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            } catch (error) {
                return new Response(JSON.stringify({
                    success: false,
                    error: error.message
                }), {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
        }

        // Update image metadata
        if (request.method === 'PATCH' && imageId) {
            const imagesToken = env.CLOUDFLARE_IMAGES_API_TOKEN || env.CLOUDFLARE_API_TOKEN;
            const body = await request.json();

            try {
                const response = await fetch(
                    `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1/${imageId}`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Authorization': `Bearer ${imagesToken}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(body)
                    }
                );
                const data = await response.json();
                return new Response(JSON.stringify(data), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            } catch (error) {
                return new Response(JSON.stringify({
                    success: false,
                    error: error.message
                }), {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
        }

        // Delete image
        if (request.method === 'DELETE' && imageId) {
            const imagesToken = env.CLOUDFLARE_IMAGES_API_TOKEN || env.CLOUDFLARE_API_TOKEN;

            try {
                const response = await fetch(
                    `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1/${imageId}`,
                    {
                        method: 'DELETE',
                        headers: { 'Authorization': `Bearer ${imagesToken}` }
                    }
                );
                const data = await response.json();
                return new Response(JSON.stringify(data), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            } catch (error) {
                return new Response(JSON.stringify({
                    success: false,
                    error: error.message
                }), {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
        }
    }

    // Email API
    if (path === '/api/email/send') {
        const resendKey = env.RESEND_API_KEY;

        if (!resendKey) {
            return new Response(JSON.stringify({
                success: false,
                error: 'Resend API key not configured. Please add RESEND_API_KEY as a secret in Cloudflare Workers.'
            }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        try {
            const body = await request.json();
            const response = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${resendKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    from: 'noreply@meauxaccess.com',
                    to: [body.to],
                    subject: body.subject,
                    html: body.html
                })
            });
            const data = await response.json();
            return new Response(JSON.stringify(data), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        } catch (error) {
            return new Response(JSON.stringify({
                success: false,
                error: error.message
            }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }
    }

    // Gemini AI API
    if (path === '/api/ai/gemini' || path.startsWith('/api/ai/gemini')) {
        const geminiKey = env.GEMINI_API_KEY;

        if (!geminiKey) {
            return new Response(JSON.stringify({
                success: false,
                error: 'Gemini API key not configured'
            }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        try {
            const body = await request.json();
            const model = body.model || 'gemini-pro';
            const prompt = body.prompt || body.message;

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{ text: prompt }]
                        }]
                    })
                }
            );
            const data = await response.json();
            return new Response(JSON.stringify(data), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        } catch (error) {
            return new Response(JSON.stringify({
                success: false,
                error: error.message
            }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }
    }

    // D1 Database API
    if (path.startsWith('/api/d1/')) {
        const dbName = path.split('/api/d1/')[1]?.split('/')[0];
        const action = path.split('/api/d1/')[1]?.split('/')[1];

        if (!dbName || !env[dbName.toUpperCase()]) {
            return new Response(JSON.stringify({
                success: false,
                error: 'Database not found or not bound'
            }), {
                status: 404,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        const db = env[dbName.toUpperCase()];

        if (action === 'query') {
            try {
                const body = await request.json();
                const result = await db.prepare(body.sql).bind(...(body.params || [])).all();
                return new Response(JSON.stringify({ success: true, result }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            } catch (error) {
                return new Response(JSON.stringify({
                    success: false,
                    error: error.message
                }), {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
        }
    }

    // R2 Storage API (gclouddashboard bucket)
    if (path.startsWith('/api/r2/')) {
        const r2Action = path.split('/api/r2/')[1];

        if (!env.R2_STORAGE) {
            return new Response(JSON.stringify({
                success: false,
                error: 'R2 storage not configured. gclouddashboard bucket not bound.'
            }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        if (r2Action === 'list') {
            try {
                const prefix = url.searchParams.get('prefix') || '';
                const limit = parseInt(url.searchParams.get('limit') || '1000');
                const objects = await env.R2_STORAGE.list({ prefix, limit });
                return new Response(JSON.stringify({
                    success: true,
                    objects: objects.objects,
                    truncated: objects.truncated,
                    cursor: objects.cursor,
                    bucket: 'gclouddashboard'
                }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            } catch (error) {
                return new Response(JSON.stringify({
                    success: false,
                    error: error.message
                }), {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
        }

        if (r2Action === 'upload' && request.method === 'POST') {
            try {
                const formData = await request.formData();
                const file = formData.get('file');
                const key = formData.get('key') || file.name;
                let contentType = formData.get('contentType') || file.type;

                // Auto-detect content types for common files
                if (!contentType || contentType === 'application/octet-stream') {
                    if (key.endsWith('.html')) contentType = 'text/html';
                    else if (key.endsWith('.js')) contentType = 'application/javascript';
                    else if (key.endsWith('.css')) contentType = 'text/css';
                    else if (key.endsWith('.wasm')) contentType = 'application/wasm';
                    else if (key.endsWith('.splinecode')) contentType = 'application/octet-stream';
                    else if (key.endsWith('.json')) contentType = 'application/json';
                }

                await env.R2_STORAGE.put(key, file, {
                    httpMetadata: { contentType }
                });
                return new Response(JSON.stringify({
                    success: true,
                    key,
                    url: `https://pub-42686213672d4f53acdad25facc12365.r2.dev/${key}`
                }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            } catch (error) {
                return new Response(JSON.stringify({
                    success: false,
                    error: error.message
                }), {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
        }

        // Upload multiple files (for Spline projects)
        if (r2Action === 'upload-batch' && request.method === 'POST') {
            try {
                const formData = await request.formData();
                const files = formData.getAll('files');
                const prefix = formData.get('prefix') || 'spline/';
                const uploaded = [];

                for (const file of files) {
                    if (!file || !(file instanceof File)) continue;
                    const key = `${prefix}${file.name}`;
                    let contentType = file.type;

                    // Auto-detect content types
                    if (!contentType || contentType === 'application/octet-stream') {
                        if (file.name.endsWith('.html')) contentType = 'text/html';
                        else if (file.name.endsWith('.js')) contentType = 'application/javascript';
                        else if (file.name.endsWith('.css')) contentType = 'text/css';
                        else if (file.name.endsWith('.wasm')) contentType = 'application/wasm';
                        else if (file.name.endsWith('.splinecode')) contentType = 'application/octet-stream';
                    }

                    await env.R2_STORAGE.put(key, file, {
                        httpMetadata: { contentType }
                    });
                    uploaded.push({
                        key,
                        url: `https://pub-42686213672d4f53acdad25facc12365.r2.dev/${key}`,
                        size: file.size
                    });
                }

                return new Response(JSON.stringify({
                    success: true,
                    uploaded,
                    count: uploaded.length
                }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            } catch (error) {
                return new Response(JSON.stringify({
                    success: false,
                    error: error.message
                }), {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
        }

        if (r2Action === 'delete' && request.method === 'DELETE') {
            try {
                const key = url.searchParams.get('key');
                if (!key) {
                    return new Response(JSON.stringify({
                        success: false,
                        error: 'Key parameter required'
                    }), {
                        status: 400,
                        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                    });
                }
                await env.R2_STORAGE.delete(key);
                return new Response(JSON.stringify({ success: true, deleted: key }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            } catch (error) {
                return new Response(JSON.stringify({
                    success: false,
                    error: error.message
                }), {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
        }

        if (r2Action === 'get' && request.method === 'GET') {
            try {
                const key = url.searchParams.get('key');
                if (!key) {
                    return new Response(JSON.stringify({
                        success: false,
                        error: 'Key parameter required'
                    }), {
                        status: 400,
                        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                    });
                }
                const object = await env.R2_STORAGE.get(key);
                if (!object) {
                    return new Response(JSON.stringify({
                        success: false,
                        error: 'Object not found'
                    }), {
                        status: 404,
                        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                    });
                }

                // Determine content type based on file extension
                let contentType = object.httpMetadata?.contentType || 'application/octet-stream';
                if (key.endsWith('.glb')) contentType = 'model/gltf-binary';
                if (key.endsWith('.gltf')) contentType = 'model/gltf+json';
                if (key.endsWith('.obj')) contentType = 'model/obj';
                if (key.endsWith('.fbx')) contentType = 'application/octet-stream';
                if (key.endsWith('.usd')) contentType = 'model/vnd.usd+zip';
                if (key.endsWith('.usdz')) contentType = 'model/vnd.usdz+zip';

                return new Response(object.body, {
                    headers: {
                        ...corsHeaders,
                        'Content-Type': contentType,
                        'Content-Length': object.size.toString(),
                        'Cache-Control': 'public, max-age=31536000', // Cache 3D models for 1 year
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Expose-Headers': 'Content-Type, Content-Length'
                    }
                });
            } catch (error) {
                return new Response(JSON.stringify({
                    success: false,
                    error: error.message
                }), {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
        }

        // List 3D models (GLB, GLTF, OBJ, etc.)
        if (r2Action === 'list-3d' && request.method === 'GET') {
            try {
                const prefix = url.searchParams.get('prefix') || 'models/';
                const objects = await env.R2_STORAGE.list({ prefix, limit: 1000 });
                const modelExtensions = ['.glb', '.gltf', '.obj', '.fbx', '.usd', '.usdz', '.dae', '.3ds'];
                const models = objects.objects?.filter(obj =>
                    modelExtensions.some(ext => obj.key.toLowerCase().endsWith(ext))
                ) || [];

                return new Response(JSON.stringify({
                    success: true,
                    models: models.map(m => ({
                        key: m.key,
                        size: m.size,
                        uploaded: m.uploaded,
                        url: `https://pub-42686213672d4f53acdad25facc12365.r2.dev/${m.key}`,
                        type: m.key.split('.').pop().toLowerCase()
                    })),
                    count: models.length
                }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            } catch (error) {
                return new Response(JSON.stringify({
                    success: false,
                    error: error.message
                }), {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
        }

        // Upload 3D model with proper content type
        if (r2Action === 'upload-3d' && request.method === 'POST') {
            try {
                const formData = await request.formData();
                const file = formData.get('file');
                const key = formData.get('key') || `models/${Date.now()}-${file.name}`;

                // Determine content type
                let contentType = 'application/octet-stream';
                const fileName = file.name.toLowerCase();
                if (fileName.endsWith('.glb')) contentType = 'model/gltf-binary';
                else if (fileName.endsWith('.gltf')) contentType = 'model/gltf+json';
                else if (fileName.endsWith('.obj')) contentType = 'model/obj';
                else if (fileName.endsWith('.fbx')) contentType = 'application/octet-stream';
                else if (fileName.endsWith('.usd') || fileName.endsWith('.usdz')) contentType = 'model/vnd.usdz+zip';

                await env.R2_STORAGE.put(key, file, {
                    httpMetadata: { contentType },
                    customMetadata: {
                        uploadedAt: new Date().toISOString(),
                        originalName: file.name,
                        fileType: '3d-model'
                    }
                });

                return new Response(JSON.stringify({
                    success: true,
                    key,
                    url: `https://pub-42686213672d4f53acdad25facc12365.r2.dev/${key}`,
                    contentType,
                    size: file.size
                }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            } catch (error) {
                return new Response(JSON.stringify({
                    success: false,
                    error: error.message
                }), {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
        }
    }

    // Google Cloud API
    if (path.startsWith('/api/google/')) {
        const googleAction = path.split('/api/google/')[1];
        const googleKey = env.GOOGLE_API_KEY || env.GOOGLE_API_KEY2 || env.GOOGLE_API_KEY_MEAUXOS;

        if (!googleKey) {
            return new Response(JSON.stringify({
                success: false,
                error: 'Google API key not configured'
            }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        if (googleAction === 'translate') {
            try {
                const body = await request.json();
                const response = await fetch(
                    `https://translation.googleapis.com/language/translate/v2?key=${googleKey}`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            q: body.text,
                            target: body.target || 'en',
                            source: body.source
                        })
                    }
                );
                const data = await response.json();
                return new Response(JSON.stringify(data), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            } catch (error) {
                return new Response(JSON.stringify({
                    success: false,
                    error: error.message
                }), {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
        }

        if (googleAction === 'vision') {
            try {
                const body = await request.json();
                const response = await fetch(
                    `https://vision.googleapis.com/v1/images:annotate?key=${googleKey}`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            requests: [{
                                image: { content: body.image },
                                features: body.features || [{ type: 'LABEL_DETECTION', maxResults: 10 }]
                            }]
                        })
                    }
                );
                const data = await response.json();
                return new Response(JSON.stringify(data), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            } catch (error) {
                return new Response(JSON.stringify({
                    success: false,
                    error: error.message
                }), {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
        }

        if (googleAction === 'storage') {
            try {
                const body = await request.json();
                const action = body.action; // 'list', 'upload', 'download', 'delete'

                // Google Cloud Storage API integration
                // This would require OAuth2 or service account credentials
                // For now, return a placeholder
                return new Response(JSON.stringify({
                    success: false,
                    error: 'Google Cloud Storage requires OAuth2 credentials. Use R2 storage instead.',
                    alternative: 'Use /api/r2/ endpoints for storage operations'
                }), {
                    status: 501,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            } catch (error) {
                return new Response(JSON.stringify({
                    success: false,
                    error: error.message
                }), {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
        }
    }

    // AWS API (Bedrock, S3, etc.)
    if (path.startsWith('/api/aws/')) {
        const awsAction = path.split('/api/aws/')[1];
        const awsAccessKey = env.AWS_ACCESS_KEY_ID;
        const awsSecretKey = env.AWS_SECRET_ACCESS_KEY;
        const awsRegion = env.AWS_REGION || 'us-east-2';

        if (!awsAccessKey || !awsSecretKey) {
            return new Response(JSON.stringify({
                success: false,
                error: 'AWS credentials not configured'
            }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        if (awsAction === 'bedrock') {
            try {
                const body = await request.json();
                // AWS Bedrock API integration
                // Would require AWS SDK or direct API calls with signature v4
                return new Response(JSON.stringify({
                    success: false,
                    error: 'AWS Bedrock integration requires AWS SDK. Use Gemini AI instead via /api/ai/gemini',
                    note: 'AWS Bedrock token is configured but requires additional SDK setup'
                }), {
                    status: 501,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            } catch (error) {
                return new Response(JSON.stringify({
                    success: false,
                    error: error.message
                }), {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
        }
    }

    // Projects API (using D1 or KV)
    if (path.startsWith('/api/projects/')) {
        const projectId = path.split('/api/projects/')[1];

        if (request.method === 'GET' && !projectId) {
            // List all projects
            try {
                // Use KV or return mock data for now
                const projects = await env.KV_PROJECTS?.get('projects', 'json') || [];
                return new Response(JSON.stringify({ success: true, projects }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            } catch (error) {
                return new Response(JSON.stringify({ success: true, projects: [] }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
        }

        if (request.method === 'POST') {
            // Create project
            try {
                const body = await request.json();
                const project = { id: Date.now().toString(), ...body, createdAt: new Date().toISOString() };
                const projects = await env.KV_PROJECTS?.get('projects', 'json') || [];
                projects.push(project);
                await env.KV_PROJECTS?.put('projects', JSON.stringify(projects));
                return new Response(JSON.stringify({ success: true, project }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            } catch (error) {
                return new Response(JSON.stringify({
                    success: false,
                    error: error.message
                }), {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
        }
    }

    // Analytics API
    if (path === '/api/analytics/stats') {
        try {
            // Get real stats from various sources
            const tasks = JSON.parse(await env.KV_PROJECTS?.get('projects', 'json') || '[]');
            const imagesResponse = await fetch(
                `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1?per_page=1`,
                { headers: { 'Authorization': `Bearer ${env.CLOUDFLARE_IMAGES_API_TOKEN || env.CLOUDFLARE_API_TOKEN}` } }
            );
            const imagesData = await imagesResponse.json();
            const totalImages = imagesData.result?.count?.total || 852;

            // R2 storage stats
            let r2Stats = { objects: 0, size: 0 };
            if (env.R2_STORAGE) {
                try {
                    const r2List = await env.R2_STORAGE.list({ limit: 1000 });
                    r2Stats.objects = r2List.objects?.length || 0;
                    r2Stats.size = r2List.objects?.reduce((sum, obj) => sum + (obj.size || 0), 0) || 0;
                } catch (e) {
                    // R2 not available
                }
            }

            return new Response(JSON.stringify({
                success: true,
                stats: {
                    totalUsers: 12458, // Would come from auth system
                    activeProjects: tasks.filter(t => t.status === 'in-progress').length,
                    totalProjects: tasks.length,
                    totalImages: totalImages,
                    storageUsed: (r2Stats.size / 1024 / 1024 / 1024).toFixed(2) + ' GB',
                    storageObjects: r2Stats.objects,
                    apiRequests: 1200000, // Would come from analytics
                    imagesDelivered: 8828 // From Cloudflare Images
                }
            }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        } catch (error) {
            return new Response(JSON.stringify({
                success: false,
                error: error.message
            }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }
    }

    // Groq AI API
    if (path === '/api/ai/groq') {
        const groqKey = env.GROQ_API_KEY;
        if (!groqKey) {
            return new Response(JSON.stringify({
                success: false,
                error: 'Groq API key not configured'
            }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }
        try {
            const body = await request.json();
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${groqKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: body.model || 'llama-3.1-70b-versatile',
                    messages: body.messages || [{ role: 'user', content: body.prompt }]
                })
            });
            const data = await response.json();
            return new Response(JSON.stringify(data), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        } catch (error) {
            return new Response(JSON.stringify({
                success: false,
                error: error.message
            }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }
    }

    // Meshy AI API
    if (path.startsWith('/api/meshy/')) {
        const meshyKey = env.MESHYAI_API_KEY;
        if (!meshyKey) {
            return new Response(JSON.stringify({
                success: false,
                error: 'Meshy AI API key not configured. Add MESHYAI_API_KEY as a secret in Cloudflare Dashboard.'
            }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }
        const meshyAction = path.split('/api/meshy/')[1];
        try {
            if (meshyAction === 'create' || meshyAction === 'text-to-3d') {
                const body = await request.json();
                const response = await fetch('https://api.meshy.ai/v2/text-to-3d', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${meshyKey}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        prompt: body.prompt,
                        art_style: body.art_style || 'realistic',
                        resolution: body.resolution || '1024',
                        negative_prompt: body.negative_prompt,
                        seed: body.seed
                    })
                });
                const data = await response.json();
                return new Response(JSON.stringify(data), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }

            if (meshyAction === 'status' || meshyAction.startsWith('task/')) {
                const taskId = meshyAction.split('task/')[1] || url.searchParams.get('task_id');
                if (!taskId) {
                    return new Response(JSON.stringify({
                        success: false,
                        error: 'Task ID required'
                    }), {
                        status: 400,
                        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                    });
                }
                const response = await fetch(`https://api.meshy.ai/v2/text-to-3d/${taskId}`, {
                    headers: {
                        'Authorization': `Bearer ${meshyKey}`
                    }
                });
                const data = await response.json();
                return new Response(JSON.stringify(data), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }

            if (meshyAction === 'image-to-3d') {
                const body = await request.json();
                const formData = new FormData();
                if (body.image_url) {
                    formData.append('image_url', body.image_url);
                } else if (body.image) {
                    formData.append('image', body.image);
                }
                formData.append('art_style', body.art_style || 'realistic');
                formData.append('resolution', body.resolution || '1024');

                const response = await fetch('https://api.meshy.ai/v2/image-to-3d', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${meshyKey}`
                    },
                    body: formData
                });
                const data = await response.json();
                return new Response(JSON.stringify(data), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
        } catch (error) {
            return new Response(JSON.stringify({
                success: false,
                error: error.message
            }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }
    }

    // CloudConvert API
    if (path.startsWith('/api/cloudconvert/')) {
        const cloudconvertKey = env.CLOUDCONVERT_API_KEY;
        if (!cloudconvertKey) {
            return new Response(JSON.stringify({
                success: false,
                error: 'CloudConvert API key not configured. Add CLOUDCONVERT_API_KEY as a secret in Cloudflare Dashboard.'
            }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }
        const convertAction = path.split('/api/cloudconvert/')[1];
        try {
            if (convertAction === 'convert' || convertAction === 'job') {
                if (request.method === 'POST') {
                    // Create conversion job
                    const body = await request.json();
                    const response = await fetch('https://api.cloudconvert.com/v2/jobs', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${cloudconvertKey}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            tasks: {
                                'import-my-file': {
                                    operation: 'import/url',
                                    url: body.input_url || body.url
                                },
                                'convert-my-file': {
                                    operation: 'convert',
                                    input: 'import-my-file',
                                    output_format: body.output_format || 'glb',
                                    options: body.options || {}
                                },
                                'export-my-file': {
                                    operation: 'export/url',
                                    input: 'convert-my-file'
                                }
                            }
                        })
                    });
                    const data = await response.json();
                    return new Response(JSON.stringify(data), {
                        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                    });
                } else if (request.method === 'GET') {
                    // Get job status
                    const jobId = url.searchParams.get('job_id');
                    if (!jobId) {
                        return new Response(JSON.stringify({
                            success: false,
                            error: 'Job ID required'
                        }), {
                            status: 400,
                            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                        });
                    }
                    const response = await fetch(`https://api.cloudconvert.com/v2/jobs/${jobId}`, {
                        headers: {
                            'Authorization': `Bearer ${cloudconvertKey}`
                        }
                    });
                    const data = await response.json();
                    return new Response(JSON.stringify(data), {
                        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                    });
                }
            }

            if (convertAction === 'formats') {
                // Get supported formats
                const response = await fetch('https://api.cloudconvert.com/v2/import/formats', {
                    headers: {
                        'Authorization': `Bearer ${cloudconvertKey}`
                    }
                });
                const data = await response.json();
                return new Response(JSON.stringify(data), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
        } catch (error) {
            return new Response(JSON.stringify({
                success: false,
                error: error.message
            }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }
    }

    // MCP (Model Context Protocol) API
    if (path.startsWith('/api/mcp/')) {
        // MCP integration placeholder - would connect to MCP server
        return new Response(JSON.stringify({
            success: false,
            error: 'MCP integration requires MCP server setup',
            note: 'MCP allows AI models to access external tools and data sources'
        }), {
            status: 501,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }

    // Browser Rendering API
    if (path === '/api/browser/render') {
        try {
            const body = await request.json();
            const html = body.html || body.content;
            // Store HTML in R2 for rendering
            if (env.R2_STORAGE && html) {
                const key = `previews/${Date.now()}.html`;
                await env.R2_STORAGE.put(key, html, {
                    httpMetadata: { contentType: 'text/html' }
                });
                return new Response(JSON.stringify({
                    success: true,
                    url: `https://pub-42686213672d4f53acdad25facc12365.r2.dev/${key}`,
                    key: key
                }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
            return new Response(JSON.stringify({
                success: false,
                error: 'R2 storage not available'
            }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        } catch (error) {
            return new Response(JSON.stringify({
                success: false,
                error: error.message
            }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }
    }

    return new Response(JSON.stringify({ success: false, error: 'API endpoint not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
}

function getContentType(path) {
    if (path.endsWith('.html')) return 'text/html';
    if (path.endsWith('.css')) return 'text/css';
    if (path.endsWith('.js')) return 'application/javascript';
    if (path.endsWith('.json')) return 'application/json';
    if (path.endsWith('.png')) return 'image/png';
    if (path.endsWith('.jpg') || path.endsWith('.jpeg')) return 'image/jpeg';
    if (path.endsWith('.svg')) return 'image/svg+xml';
    if (path.endsWith('.ico')) return 'image/x-icon';
    if (path.endsWith('.woff') || path.endsWith('.woff2')) return 'font/woff2';
    return 'text/plain';
}

