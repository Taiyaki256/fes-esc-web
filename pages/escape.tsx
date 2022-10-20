import { ReactElement } from "react";
import styles from "styles/esc.module.scss";
import Layout from 'components/layout/Layout'


const Escape = () => {
  const pages = 0;
  switch (pages) {
    case 0:
      return (
        <>
          <div className={styles.main}>
            <div className={styles.mainTop}>
            </div>
            <div className={styles.question}>
              <p>T=1 D=1 F=2 K=?</p>
            </div>
            <div className={styles.textBox}>
              <textarea rows={4} className={styles.textBox0}></textarea>
            </div>
            <div className={styles.mainBottom}>
              <div className={styles.answerButton}>
              </div>
            </div>
          </div>
        </>
      )
  }
}

Escape.getLayout = function getLayout(page: ReactElement) {
  return (
  <Layout title="Layout" noshow back url="/">
      {page}
  </Layout>
  )
}

export default Escape;