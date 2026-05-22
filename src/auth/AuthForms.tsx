import React, { FormEvent, ReactNode, useState } from 'react';

export interface LoginValues {
  email: string;
  password: string;
}

export interface SignUpValues extends LoginValues {
  name: string;
  confirmPassword: string;
}

export interface LLMOption {
  id: string;
  label: string;
  provider: string;
  description?: string;
}

export interface EnvSettingsValues {
  environment: 'development' | 'staging' | 'production';
  apiBaseUrl: string;
  agentRuntimeUrl?: string;
  telemetryEnabled: boolean;
}

export interface ProfileValues {
  displayName: string;
  role: string;
  organization?: string;
  preferredModel: string;
  codingStyle?: string;
  env: EnvSettingsValues;
}

export const defaultLLMOptions: LLMOption[] = [
  { id: 'openai:gpt-4.1', label: 'GPT-4.1', provider: 'OpenAI', description: 'General coding and reasoning' },
  { id: 'anthropic:claude-sonnet', label: 'Claude Sonnet', provider: 'Anthropic', description: 'Code review and long-context work' },
  { id: 'google:gemini-pro', label: 'Gemini Pro', provider: 'Google', description: 'Multimodal and fast iteration' },
  { id: 'local:custom', label: 'Custom / Local Model', provider: 'Custom', description: 'Use your own runtime provider' },
];

export function LoginForm({ onSubmit, footer }: { onSubmit: (values: LoginValues) => void; footer?: ReactNode }) {
  const [values, setValues] = useState<LoginValues>({ email: '', password: '' });

  function submit(event: FormEvent) {
    event.preventDefault();
    onSubmit(values);
  }

  return (
    <form onSubmit={submit} style={styles.form}>
      <h2 style={styles.title}>Log in</h2>
      <label style={styles.label}>Email<input style={styles.input} type="email" value={values.email} onChange={(event) => setValues({ ...values, email: event.target.value })} required /></label>
      <label style={styles.label}>Password<input style={styles.input} type="password" value={values.password} onChange={(event) => setValues({ ...values, password: event.target.value })} required /></label>
      <button style={styles.primaryButton} type="submit">Log in</button>
      {footer}
    </form>
  );
}

export function SignUpForm({ onSubmit, footer }: { onSubmit: (values: SignUpValues) => void; footer?: ReactNode }) {
  const [values, setValues] = useState<SignUpValues>({ name: '', email: '', password: '', confirmPassword: '' });

  function submit(event: FormEvent) {
    event.preventDefault();
    onSubmit(values);
  }

  return (
    <form onSubmit={submit} style={styles.form}>
      <h2 style={styles.title}>Create account</h2>
      <label style={styles.label}>Name<input style={styles.input} value={values.name} onChange={(event) => setValues({ ...values, name: event.target.value })} required /></label>
      <label style={styles.label}>Email<input style={styles.input} type="email" value={values.email} onChange={(event) => setValues({ ...values, email: event.target.value })} required /></label>
      <label style={styles.label}>Password<input style={styles.input} type="password" value={values.password} onChange={(event) => setValues({ ...values, password: event.target.value })} required /></label>
      <label style={styles.label}>Confirm password<input style={styles.input} type="password" value={values.confirmPassword} onChange={(event) => setValues({ ...values, confirmPassword: event.target.value })} required /></label>
      <button style={styles.primaryButton} type="submit">Sign up</button>
      {footer}
    </form>
  );
}

export function LLMSelector({ options = defaultLLMOptions, value, onChange }: { options?: LLMOption[]; value: string; onChange: (value: string) => void }) {
  return (
    <div style={styles.stack}>
      <label style={styles.label}>Preferred LLM</label>
      <div style={styles.optionGrid}>
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            style={{ ...styles.optionCard, borderColor: value === option.id ? '#4f46e5' : '#e5e7eb' }}
          >
            <strong>{option.label}</strong>
            <span>{option.provider}</span>
            {option.description && <small>{option.description}</small>}
          </button>
        ))}
      </div>
    </div>
  );
}

export function EnvSettingsForm({ value, onChange }: { value: EnvSettingsValues; onChange: (value: EnvSettingsValues) => void }) {
  return (
    <section style={styles.section}>
      <h3 style={styles.sectionTitle}>Environment settings</h3>
      <label style={styles.label}>Environment
        <select style={styles.input} value={value.environment} onChange={(event) => onChange({ ...value, environment: event.target.value as EnvSettingsValues['environment'] })}>
          <option value="development">Development</option>
          <option value="staging">Staging</option>
          <option value="production">Production</option>
        </select>
      </label>
      <label style={styles.label}>API Base URL<input style={styles.input} value={value.apiBaseUrl} onChange={(event) => onChange({ ...value, apiBaseUrl: event.target.value })} placeholder="https://api.example.com" /></label>
      <label style={styles.label}>Agent Runtime URL<input style={styles.input} value={value.agentRuntimeUrl ?? ''} onChange={(event) => onChange({ ...value, agentRuntimeUrl: event.target.value })} placeholder="https://runtime.example.com" /></label>
      <label style={styles.checkLabel}><input type="checkbox" checked={value.telemetryEnabled} onChange={(event) => onChange({ ...value, telemetryEnabled: event.target.checked })} /> Enable telemetry</label>
    </section>
  );
}

export function ProfileCreationForm({ onSubmit, llmOptions = defaultLLMOptions }: { onSubmit: (values: ProfileValues) => void; llmOptions?: LLMOption[] }) {
  const [values, setValues] = useState<ProfileValues>({
    displayName: '',
    role: 'developer',
    organization: '',
    preferredModel: llmOptions[0]?.id ?? 'custom',
    codingStyle: 'balanced',
    env: {
      environment: 'development',
      apiBaseUrl: 'http://localhost:8000',
      agentRuntimeUrl: 'http://localhost:8000',
      telemetryEnabled: false,
    },
  });

  function submit(event: FormEvent) {
    event.preventDefault();
    onSubmit(values);
  }

  return (
    <form onSubmit={submit} style={styles.formWide}>
      <h2 style={styles.title}>Create profile</h2>
      <label style={styles.label}>Display name<input style={styles.input} value={values.displayName} onChange={(event) => setValues({ ...values, displayName: event.target.value })} required /></label>
      <label style={styles.label}>Role<input style={styles.input} value={values.role} onChange={(event) => setValues({ ...values, role: event.target.value })} /></label>
      <label style={styles.label}>Organization<input style={styles.input} value={values.organization} onChange={(event) => setValues({ ...values, organization: event.target.value })} /></label>
      <label style={styles.label}>Coding style
        <select style={styles.input} value={values.codingStyle} onChange={(event) => setValues({ ...values, codingStyle: event.target.value })}>
          <option value="fast">Fast</option>
          <option value="balanced">Balanced</option>
          <option value="safe">Safe / review-heavy</option>
        </select>
      </label>
      <LLMSelector options={llmOptions} value={values.preferredModel} onChange={(preferredModel) => setValues({ ...values, preferredModel })} />
      <EnvSettingsForm value={values.env} onChange={(env) => setValues({ ...values, env })} />
      <button style={styles.primaryButton} type="submit">Save profile</button>
    </form>
  );
}

const styles: Record<string, React.CSSProperties> = {
  form: { width: '100%', maxWidth: 420, display: 'grid', gap: 14, padding: 24, border: '1px solid #e5e7eb', borderRadius: 18, background: '#fff' },
  formWide: { width: '100%', maxWidth: 760, display: 'grid', gap: 16, padding: 24, border: '1px solid #e5e7eb', borderRadius: 18, background: '#fff' },
  title: { margin: 0, color: '#111827', fontSize: 24 },
  section: { display: 'grid', gap: 12, padding: 16, border: '1px solid #e5e7eb', borderRadius: 14, background: '#f9fafb' },
  sectionTitle: { margin: 0, fontSize: 16, color: '#111827' },
  stack: { display: 'grid', gap: 10 },
  label: { display: 'grid', gap: 6, color: '#374151', fontSize: 14, fontWeight: 700 },
  checkLabel: { display: 'flex', alignItems: 'center', gap: 8, color: '#374151', fontSize: 14, fontWeight: 700 },
  input: { width: '100%', boxSizing: 'border-box', border: '1px solid #d1d5db', borderRadius: 10, padding: '10px 12px', fontSize: 14 },
  primaryButton: { border: 0, borderRadius: 12, padding: '12px 16px', background: '#4f46e5', color: '#fff', fontWeight: 800, cursor: 'pointer' },
  optionGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 },
  optionCard: { textAlign: 'left', display: 'grid', gap: 4, border: '2px solid #e5e7eb', borderRadius: 14, padding: 12, background: '#fff', cursor: 'pointer' },
};
