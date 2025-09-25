import Default from "./layouts/default";
import WhatsAppPopup from "./components/WhatsAppPopup";
import CouponBar from "./components/CouponBar";
import LoadingScreen from "./components/LoadingScreen";


function App() {
 return (
 (
  <>
    <LoadingScreen />
    <CouponBar />
    <Default />
    <WhatsAppPopup />
  </>
)
 )
}

export default App;
