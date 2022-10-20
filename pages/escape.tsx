import { ReactElement, SetStateAction, useState } from "react";
import styles from "styles/esc.module.scss";
import Layout from 'components/layout/Layout'



const Escape = () => {
  const [pages, setPages] = useState(0);
  const [text, setText] = useState("");

  const textArea = () => {
    return (
      <div className={styles.textBox}>
        <textarea rows={4} className={styles.textBox0} value={text} onChange={changeText}></textarea>
      </div>
    )
  }
  const ansBtn = () => {
    return (
      <div className={styles.answerButton}>
        <button className={styles.ansBtn} onClick={() => onClick()}>Answer</button>
      </div>
    )
  }
  const onClick = () => {
    console.log("a");
    console.log("pages: " + pages);
    console.log("text: " + text);
    if (text == "43" && pages == 0) {
      setPages(1);
    }
    if (text == "13" && pages == 1) {
      setPages(2);
    }
    if (text == "POOL" && pages == 2) {
      setPages(3);
    }
    if (text == "12" && pages == 3) {
      setPages(4);
    }
    setText("");
  }
  const changeText = (e: { target: { value: SetStateAction<string>; }; }) => {
    setText(e.target.value);
  };
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
            {textArea()}
            <div className={styles.mainBottom}>
              {ansBtn()}
            </div>
          </div>
        </>
      )
    case 1:
      return (
        <>
          <div className={styles.main}>
            <div className={styles.mainTop}>
            </div>
            <div className={styles.question}>
              <p>場所 教卓のしたとか</p>
            </div>
            {textArea()}
            <div className={styles.mainBottom}>
              {ansBtn()}
            </div>
          </div>
        </>
      )
    case 2:
      return (
        <>
          <div className={styles.main}>
            <div className={styles.mainTop}>
            </div>
            <div className={styles.question}>
              <p>WD=木,RM=部屋,DR=人形,PL=?</p>
            </div>
            {textArea()}
            <div className={styles.mainBottom}>
              {ansBtn()}
            </div>
          </div>
        </>
      )
    case 3:
      return (
        <>
          <div className={styles.main}>
            <div className={styles.mainTop}>
            </div>
            <div className={styles.question}>
              <p>0,1,1,2,3,5,V,13,21,34,55…の時 X=?
                1,W,27,64,125,216…の時 Y=?
                3.1,X,1,5,9,2,6,5…の時 Z=?
                X+Y-Z=A
                A を答えよ</p>
            </div>
            {textArea()}
            <div className={styles.mainBottom}>
              {ansBtn()}
            </div>
          </div>
        </>
      )
    case 4:
      return (
        <>
          <div className={styles.main}>
            <div className={styles.mainTop}>
            </div>
            <div className={styles.question}>
              <p>暗証番号 4614</p>
            </div>
            <div className={styles.mainBottom}>
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