import { notFound } from "next/navigation";

import CollectionEditor from "@/components/admin/CollectionEditor";
import CollectionTabs from "@/components/admin/CollectionTabs";
import { collections } from "@/lib/admin/collections";

export const dynamic = "force-dynamic";

export default function CollectionPage({ params }) {
  const config = collections[params.collection];

  if (!config) {
    notFound();
  }

  return (
    <div>
      <CollectionTabs activeKey={params.collection} />
      <CollectionEditor configKey={params.collection} config={config} />
    </div>
  );
}
