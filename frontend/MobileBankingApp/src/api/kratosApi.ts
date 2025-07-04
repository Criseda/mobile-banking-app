import { Platform } from 'react-native';

const getBaseUrl = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:4433'; // Special IP for Android Emulator
  }
  return 'http://localhost:4433'; // iOS can use localhost
};

const KRATOS_PUBLIC_URL = getBaseUrl();

// Simplified fetch configuration
const fetchConfig = {
  credentials: 'omit' as const, // Don't send cookies
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

export interface RegistrationFlow {
  id: string;
  ui: {
    action: string;
    nodes: any[];
  };
}

export interface LoginFlow {
  id: string;
  ui: {
    action: string;
    nodes: any[];
  };
}

export interface LoginResponse {
  session_token: string;
  session: {
    id: string;
    identity: {
      id: string;
      traits: {
        email: string;
      };
    };
    active: boolean;
    expires_at: string;
  };
}

export interface RegistrationResponse {
  identity: {
    id: string;
    traits: {
      email: string;
    };
  };
}

export interface Session {
  id: string;
  identity: {
    id: string;
    traits: {
      email: string;
    };
  };
}

// Initialize registration flow
export const initRegistrationFlow = async (): Promise<RegistrationFlow> => {
  const response = await fetch(
    `${KRATOS_PUBLIC_URL}/self-service/registration/api`,
    {
      ...fetchConfig,
      method: 'GET',
    },
  );
  if (!response.ok) throw new Error('Failed to initialize registration');
  return response.json();
};

// Submit registration
export const submitRegistration = async (
  flowId: string,
  email: string,
  password: string,
): Promise<RegistrationResponse> => {
  const response = await fetch(
    `${KRATOS_PUBLIC_URL}/self-service/registration?flow=${flowId}`,
    {
      ...fetchConfig,
      method: 'POST',
      body: JSON.stringify({
        method: 'password',
        password,
        traits: { email },
      }),
    },
  );
  if (!response.ok) throw new Error('Registration failed');
  return response.json();
};

// Initialize login flow
export const initLoginFlow = async (): Promise<LoginFlow> => {
  const response = await fetch(`${KRATOS_PUBLIC_URL}/self-service/login/api`, {
    ...fetchConfig,
    method: 'GET',
  });
  if (!response.ok) throw new Error('Failed to initialize login');
  return response.json();
};

// Submit login
export const submitLogin = async (
  flowId: string,
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const response = await fetch(
    `${KRATOS_PUBLIC_URL}/self-service/login?flow=${flowId}`,
    {
      ...fetchConfig,
      method: 'POST',
      body: JSON.stringify({
        method: 'password',
        identifier: email,
        password,
      }),
    },
  );
  if (!response.ok) throw new Error('Login failed');
  return response.json();
};

// Check current session
export const getCurrentSession = async (
  sessionToken: string,
): Promise<Session> => {
  const response = await fetch(`${KRATOS_PUBLIC_URL}/sessions/whoami`, {
    credentials: 'omit' as const,
    headers: {
      Authorization: `Bearer ${sessionToken}`,
      Accept: 'application/json',
    },
  });
  if (!response.ok) throw new Error('Invalid session');
  return response.json();
};
