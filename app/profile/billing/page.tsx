import PageContainer from "@/components/PageContainer";
import { FaCreditCard } from "react-icons/fa";

export default function BillingPage() {
  return (
    <PageContainer
      title='Billing'
      icon={<FaCreditCard />}
    >
      <div>Billing</div>
    </PageContainer>
  );
}
