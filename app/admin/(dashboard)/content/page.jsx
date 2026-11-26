import CollectionEditor from "@/components/admin/CollectionEditor";
import CollectionTabs from "@/components/admin/CollectionTabs";
import { collections } from "@/lib/admin/collections";

export const dynamic = "force-dynamic";

const firstKey = Object.keys(collections)[0];

export default function ContentIndexPage() {
  return (
    <div>
      <CollectionTabs activeKey={firstKey} />
      <CollectionEditor configKey={firstKey} config={collections[firstKey]} />
    </div>
  );
}
