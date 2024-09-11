import { RouterProvider } from "react-router-dom";
import { AppRoutes } from "./routes";
import "./App.css";

function App() {
  // const [dividerPosition, setDividerPosition] = useState(80);
  // const [isResizing, setIsResizing] = useState(false);
  // const handleMouseDown = () => {
  //   console.log("handleMouseDown");
  //   setIsResizing(true);
  // };
  // const handleMouseUp = () => {
  //   setIsResizing(false);
  //   console.log("handleMouseUp");
  // };
  // const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   if (!isResizing) return;
  //   const newPosition = (e.clientX / window.innerWidth) * 100;
  //   console.log("handleMouseMove", newPosition);
  //   setDividerPosition(newPosition);
  // };
  const user = {
    accountId: 1234567,
    givenName: 'India',
    familyName: 'Anderson',
    avataxUserId: '45678',
    isLoggedIn: true
  }
  return (
    <>
      <aui-header productname="Connector Pathfinders" user={JSON.stringify(user)}></aui-header>
      {/* <main>
          <div style={{display:'flex'}}>
          <div style={{flexBasis:`${dividerPosition}%`, height:'100%', borderLeft: '1px solid gray'}} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
                  <RouterProvider router={AppRoutes()}/>
              </div>
              <div onMouseDown={handleMouseDown} style={{width:'10px', borderLeft:'solid 1px gray',cursor:'col-resize', height:'100%', overflow:'hidden', }}>
                <div style={{width:'10px', height:'10px', backgroundColor:'orange'}}>
                </div>
              </div>
              <div style={{width:`${100-dividerPosition}%`, height:'100%'}} onMouseMove={handleMouseMove}>
                  Chat Panel
              </div>
          </div>
      </main> */}
          <main>
           <RouterProvider router={AppRoutes()} />
          </main>
      <aui-footer></aui-footer>
    </>
  );
}

export default App;
