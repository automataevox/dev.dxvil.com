import '@testing-library/jest-dom'

// Polyfill TextEncoder and TextDecoder for Jest
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

// Mock fetch global
if (typeof fetch === 'undefined') {
  global.fetch = jest.fn();
}

// Mock Next.js Request and Response APIs
if (typeof Request === 'undefined') {
  global.Request = class Request {
    constructor(input: string | URL, init?: RequestInit) {
      return {
        url: input.toString(),
        method: init?.method || 'GET',
        headers: new Headers(init?.headers),
        body: init?.body,
        json: async () => JSON.parse(init?.body as string || '{}'),
        text: async () => init?.body as string || '',
        clone: () => this,
      } as unknown as Request;
    }
  } as unknown as typeof Request;
}

if (typeof Response === 'undefined') {
  global.Response = class Response {
    constructor(body?: BodyInit | null, init?: ResponseInit) {
      return {
        ok: init?.status ? init.status >= 200 && init.status < 300 : true,
        status: init?.status || 200,
        statusText: init?.statusText || 'OK',
        headers: new Headers(init?.headers),
        body,
        json: async () => (typeof body === 'string' ? JSON.parse(body) : body),
        text: async () => (typeof body === 'string' ? body : JSON.stringify(body)),
        clone: () => this,
      } as unknown as Response;
    }
  } as unknown as typeof Response;
}

if (typeof Headers === 'undefined') {
  global.Headers = class Headers {
    private headers: Map<string, string>;
    constructor(init?: HeadersInit) {
      this.headers = new Map();
      if (init) {
        if (Array.isArray(init)) {
          init.forEach(([key, value]) => this.headers.set(key.toLowerCase(), value));
        } else if (init instanceof Headers) {
          init.forEach((value: string, key: string) => {
            this.headers.set(key.toLowerCase(), value);
          });
        } else {
          Object.entries(init).forEach(([key, value]) => {
            this.headers.set(key.toLowerCase(), value);
          });
        }
      }
    }
    get(name: string) {
      return this.headers.get(name.toLowerCase()) || null;
    }
    set(name: string, value: string) {
      this.headers.set(name.toLowerCase(), value);
    }
    has(name: string) {
      return this.headers.has(name.toLowerCase());
    }
    delete(name: string) {
      this.headers.delete(name.toLowerCase());
    }
    forEach(callback: (value: string, key: string) => void) {
      this.headers.forEach(callback);
    }
  } as unknown as typeof Headers;
}

// Mock NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((body: unknown, init?: ResponseInit) => {
      const headers = new Headers(init?.headers);
      headers.set('content-type', 'application/json');
      return {
        ok: init?.status ? init.status >= 200 && init.status < 300 : true,
        status: init?.status || 200,
        statusText: init?.statusText || 'OK',
        headers,
        body,
        json: async () => body,
        text: async () => JSON.stringify(body),
        clone: function() { return this; },
      };
    }),
  },
  NextRequest: class NextRequest {
    private _body: unknown;
    public url: string;
    public method: string;
    public headers: Headers;

    constructor(url: string | URL, init?: RequestInit) {
      this.url = url.toString();
      this.method = init?.method || 'GET';
      this.headers = new Headers(init?.headers);
      this._body = init?.body;
    }

    async json() {
      return JSON.parse(this._body as string);
    }

    async text() {
      return this._body as string;
    }

    clone() {
      return new NextRequest(this.url, {
        method: this.method,
        headers: this.headers,
        body: this._body as BodyInit,
      });
    }
  },
}));

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    }
  },
  usePathname() {
    return '/'
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return []
  }
  unobserve() {}
} as unknown as typeof IntersectionObserver

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})
