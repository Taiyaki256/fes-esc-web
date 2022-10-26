import { ReactElement, SetStateAction, useState } from "react";
import styles from "styles/dash.module.scss";
import Layout from 'components/layout/Layout'
import { Button, Grid } from "@nextui-org/react";

const Dashboard = () => {
  const [status, setStatus] = useState(0);
  const previewStatus = () => {
    return (
      <></>
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
                <Button size="xl" color="gradient" auto onClick={() => console.log("a")} className="m-2">
                  Start
                </Button>
              </Grid>
              <Grid>
                <Button size="xl" color="gradient" auto onClick={() => console.log("b")} className="m-2">
                  Reset
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