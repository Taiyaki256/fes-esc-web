import { ReactElement, SetStateAction, useEffect, useState } from "react";
import styles from "styles/dash.module.scss";
import Layout from 'components/layout/Layout'
import { Button, Grid } from "@nextui-org/react";
import io from "socket.io-client";
import { wsURL } from "lib/socket";

const socket = io(wsURL + "dashboard");


const Dashboard = () => {
  const [status, setStatus] = useState(0);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  });
  const previewStatus = () => {
    return (
      <>
        <p>Status</p>
        <div>nowPlayingTeam</div>
        <div>page</div>
        <div>createAt</div>
        <div>Timer</div>
        <div>state</div>
      </>
    )
  }
  return (
    <>
      <div className={styles.main}>
        <div className={styles.mainTop}>
        </div>
        <div id="dash" className="h-full">
          <div className={styles.buttons}>
            <Grid.Container gap={2} justify="center">
              <Grid>
                <Button size="xl" color="gradient" auto onClick={() => { socket.emit("start") }} className="m-2">
                  Start Video
                </Button>
              </Grid>
              <Grid>
                <Button size="xl" color="gradient" auto onClick={() => { socket.emit("reset") }} className="m-2">
                  Reset Game
                </Button>
              </Grid>
            </Grid.Container>
          </div>
          <div className={styles.status}>
            {previewStatus()}
          </div>
        </div>
      </div>
    </>
  )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title="Layout" noshow back url="/">
      {page}
    </Layout>
  )
}

export default Dashboard;