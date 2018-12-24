
import DynamicAlertsManager from "../components/DynamicAlertsManager/DynamicAlertsManager";
import Layout from '../components/Layout/Layout';
import GuestbookForm from "../components/GuestbookForm/GuestbookForm";

export default () => (
  <Layout>
    <DynamicAlertsManager>
      <GuestbookForm />
    </DynamicAlertsManager>
  </Layout>
)
