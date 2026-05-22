import React, { ReactNode } from 'react';

export type UniversalType = string;
export type ActionStatus = 'available' | 'queued' | 'running' | 'completed' | 'failed' | 'blocked' | 'requiresApproval';
export type ActionRisk = 'low' | 'medium' | 'high' | 'critical';
export type TriggerMode = 'manual' | 'automatic' | 'scheduled' | 'event' | 'condition' | 'approval';

export interface UniversalCardProps {
  type: UniversalType;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  icon?: ReactNode;
  properties?: Record<string, string | number | boolean | null | undefined>;
  tags?: string[];
  actions?: ReactNode;
}

export interface ActionTrigger {
  mode: TriggerMode;
  source?: string;
  event?: string;
  condition?: string;
  schedule?: string;
  actor?: string;
}

export interface ActionCardProps extends Omit<UniversalCardProps, 'type'> {
  actionType: string;
  actionLabel?: string;
  verb?: string;
  target?: string;
  intent?: string;
  status?: ActionStatus;
  risk?: ActionRisk;
  requiresConfirmation?: boolean;
  payloadSummary?: string;
  actor?: string;
  trigger?: ActionTrigger;
}

export function UniversalCard({
  type,
  title,
  subtitle,
  description,
  imageUrl,
  icon,
  properties = {},
  tags = [],
  actions,
}: UniversalCardProps) {
  return (
    <article style={styles.card} data-agennext-type={type}>
      {imageUrl && <img src={imageUrl} alt={title} style={styles.image} />}
      <div style={styles.body}>
        <div style={styles.headerRow}>
          <div style={styles.typePill}>{type}</div>
          {icon && <div style={styles.icon}>{icon}</div>}
        </div>
        <h3 style={styles.title}>{title}</h3>
        {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
        {description && <p style={styles.description}>{description}</p>}
        {tags.length > 0 && <div style={styles.tags}>{tags.map((tag) => <span key={tag} style={styles.tag}>{tag}</span>)}</div>}
        {Object.keys(properties).length > 0 && (
          <dl style={styles.properties}>
            {Object.entries(properties).map(([key, value]) => value !== undefined && value !== null && (
              <div key={key} style={styles.property}>
                <dt style={styles.propertyKey}>{key}</dt>
                <dd style={styles.propertyValue}>{String(value)}</dd>
              </div>
            ))}
          </dl>
        )}
        {actions && <div style={styles.actions}>{actions}</div>}
      </div>
    </article>
  );
}

export function EntityCard(props: Omit<UniversalCardProps, 'type'> & { entityType: string }) {
  const { entityType, ...rest } = props;
  return <UniversalCard type={`entity:${entityType}`} {...rest} />;
}

export function ActionCard({
  actionType,
  actionLabel,
  verb,
  target,
  intent,
  status = 'available',
  risk = 'low',
  requiresConfirmation = false,
  payloadSummary,
  actor,
  trigger,
  properties,
  ...rest
}: ActionCardProps) {
  return (
    <UniversalCard
      type={`action:${actionType}`}
      properties={{
        action: actionLabel ?? actionType,
        verb,
        target,
        intent,
        status,
        risk,
        requiresConfirmation,
        actor,
        payloadSummary,
        triggerMode: trigger?.mode,
        triggerSource: trigger?.source,
        triggerEvent: trigger?.event,
        triggerCondition: trigger?.condition,
        triggerSchedule: trigger?.schedule,
        triggerActor: trigger?.actor,
        ...properties,
      }}
      {...rest}
    />
  );
}

export function EventCard(props: Omit<UniversalCardProps, 'type'> & { eventType: string; time?: string }) {
  const { eventType, time, properties, ...rest } = props;
  return <UniversalCard type={`event:${eventType}`} properties={{ time, ...properties }} {...rest} />;
}

export function PersonCard(props: Omit<UniversalCardProps, 'type'>) { return <EntityCard entityType="person" {...props} />; }
export function BookCard(props: Omit<UniversalCardProps, 'type'>) { return <EntityCard entityType="book" {...props} />; }
export function MovieCard(props: Omit<UniversalCardProps, 'type'>) { return <EntityCard entityType="movie" {...props} />; }
export function VehicleCard(props: Omit<UniversalCardProps, 'type'>) { return <EntityCard entityType="vehicle" {...props} />; }
export function CompanyCard(props: Omit<UniversalCardProps, 'type'>) { return <EntityCard entityType="company" {...props} />; }
export function PlaceCard(props: Omit<UniversalCardProps, 'type'>) { return <EntityCard entityType="place" {...props} />; }
export function ProductCard(props: Omit<UniversalCardProps, 'type'>) { return <EntityCard entityType="product" {...props} />; }
export function ArticleCard(props: Omit<UniversalCardProps, 'type'>) { return <EntityCard entityType="article" {...props} />; }
export function RepositoryCard(props: Omit<UniversalCardProps, 'type'>) { return <EntityCard entityType="repository" {...props} />; }
export function AgentCard(props: Omit<UniversalCardProps, 'type'>) { return <EntityCard entityType="agent" {...props} />; }
export function ToolCard(props: Omit<UniversalCardProps, 'type'>) { return <EntityCard entityType="tool" {...props} />; }

const styles: Record<string, React.CSSProperties> = {
  card: {
    border: '1px solid #e5e7eb',
    borderRadius: 18,
    background: '#ffffff',
    overflow: 'hidden',
    boxShadow: '0 18px 50px rgba(15, 23, 42, 0.08)',
  },
  image: {
    width: '100%',
    height: 180,
    objectFit: 'cover',
    display: 'block',
  },
  body: { padding: 18 },
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 10 },
  typePill: { display: 'inline-flex', borderRadius: 999, background: '#eef2ff', color: '#4338ca', padding: '4px 10px', fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.04em' },
  icon: { color: '#4f46e5' },
  title: { margin: 0, color: '#111827', fontSize: 20, lineHeight: 1.2 },
  subtitle: { margin: '6px 0 0', color: '#4b5563', fontSize: 14 },
  description: { margin: '12px 0 0', color: '#6b7280', fontSize: 14, lineHeight: 1.55 },
  tags: { display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 },
  tag: { borderRadius: 999, border: '1px solid #e5e7eb', padding: '3px 8px', fontSize: 12, color: '#374151', background: '#f9fafb' },
  properties: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 10, margin: '14px 0 0' },
  property: { margin: 0, padding: 10, borderRadius: 12, background: '#f9fafb', border: '1px solid #f3f4f6' },
  propertyKey: { margin: 0, fontSize: 11, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '.04em' },
  propertyValue: { margin: '4px 0 0', fontSize: 13, color: '#111827', fontWeight: 700 },
  actions: { display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 },
};
