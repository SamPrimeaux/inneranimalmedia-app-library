/**
 * Durable Object Stubs
 * These are stubs for DOs that may be referenced by the deployed worker
 */

export class AgentSwarm implements DurableObject {
  constructor(ctx: DurableObjectState, env: any) {
    // Stub - actual implementation may be elsewhere
  }

  async fetch(request: Request): Promise<Response> {
    return new Response("AgentSwarm managed elsewhere", { status: 503 });
  }
}

export class SessionDO implements DurableObject {
  constructor(ctx: DurableObjectState, env: any) {
    // Stub - actual implementation may be elsewhere
  }

  async fetch(request: Request): Promise<Response> {
    return new Response("SessionDO managed elsewhere", { status: 503 });
  }
}

// Production Durable Objects
export class IAMSession implements DurableObject {
  constructor(ctx: DurableObjectState, env: any) {
    // Stub - actual implementation may be elsewhere
  }

  async fetch(request: Request): Promise<Response> {
    return new Response("IAMSession managed elsewhere", { status: 503 });
  }
}

export class MeauxSession implements DurableObject {
  constructor(ctx: DurableObjectState, env: any) {
    // Stub - actual implementation may be elsewhere
  }

  async fetch(request: Request): Promise<Response> {
    return new Response("MeauxSession managed elsewhere", { status: 503 });
  }
}
