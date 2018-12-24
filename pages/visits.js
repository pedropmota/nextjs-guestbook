import Layout from "../components/Layout/Layout";
import DynamicAlertsManager from "../components/DynamicAlertsManager/DynamicAlertsManager";
import GuestbookList from "../components/GuestbookList/GuestbookList";

export default () =>
  <Layout>
    <DynamicAlertsManager>
      <GuestbookList />
    </DynamicAlertsManager>
  </Layout>