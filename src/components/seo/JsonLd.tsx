/**
 * Renders a schema.org JSON-LD block server-side.
 * Use inside any server component:
 *   <JsonLd data={organizationSchema} />
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
