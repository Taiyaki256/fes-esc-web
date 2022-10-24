import { ReactElement, SetStateAction, useState } from "react";
import styles from "styles/esc.module.scss";
import Layout from 'components/layout/Layout'

const Escape = () => {
  const [pages, setPages] = useState(0);
  const [text, setText] = useState("");

  const timer = () => {
    return (
      <div className={styles.timer}>
        <div className={styles.wrapper}>
          <div className={styles.timepartwrapper}>
            <div className={`${styles.timepart} ${styles.minutes} ${styles.tens}`}>
              <div className={styles.digitwrapper}>
                <span className={styles.digit}>0</span>
                <span className={styles.digit}>0</span>
              </div>
            </div>
            <div className={`${styles.timepart} ${styles.minutes} ${styles.ones}`}>
              <div className={styles.digitwrapper}>
                <span className={styles.digit}>0</span>
                <span className={styles.digit}>9</span>
                <span className={styles.digit}>8</span>
                <span className={styles.digit}>7</span>
                <span className={styles.digit}>6</span>
                <span className={styles.digit}>5</span>
                <span className={styles.digit}>4</span>
                <span className={styles.digit}>3</span>
                <span className={styles.digit}>2</span>
                <span className={styles.digit}>1</span>
                <span className={styles.digit}>0</span>
              </div>
            </div>
          </div>
          <div className={styles.timepartwrapper}>
            <div className={`${styles.timepart} ${styles.seconds} ${styles.tens}`}>
              <div className={styles.digitwrapper}>
                <span className={styles.digit}>0</span>
                <span className={styles.digit}>6</span>
                <span className={styles.digit}>5</span>
                <span className={styles.digit}>4</span>
                <span className={styles.digit}>3</span>
                <span className={styles.digit}>2</span>
                <span className={styles.digit}>1</span>
                <span className={styles.digit}>0</span>
              </div>
            </div>
            <div className={`${styles.timepart} ${styles.seconds} ${styles.ones}`}>
              <div className={styles.digitwrapper}>
                <span className={styles.digit}>0</span>
                <span className={styles.digit}>9</span>
                <span className={styles.digit}>8</span>
                <span className={styles.digit}>7</span>
                <span className={styles.digit}>6</span>
                <span className={styles.digit}>5</span>
                <span className={styles.digit}>4</span>
                <span className={styles.digit}>3</span>
                <span className={styles.digit}>2</span>
                <span className={styles.digit}>1</span>
                <span className={styles.digit}>0</span>
              </div>
            </div>
          </div>
          <div className={styles.timepartwrapper}>
            <div className={`${styles.timepart} ${styles.hundredths} ${styles.tens}`}>
              <div className={styles.digitwrapper}>
                <span className={styles.digit}>0</span>
                <span className={styles.digit}>9</span>
                <span className={styles.digit}>8</span>
                <span className={styles.digit}>7</span>
                <span className={styles.digit}>6</span>
                <span className={styles.digit}>5</span>
                <span className={styles.digit}>4</span>
                <span className={styles.digit}>3</span>
                <span className={styles.digit}>2</span>
                <span className={styles.digit}>1</span>
                <span className={styles.digit}>0</span>
              </div>
            </div>
            <div className={`${styles.timepart} ${styles.hundredths} ${styles.ones}`}>
              <div className={styles.digitwrapper}>
                <span className={styles.digit}>0</span>
                <span className={styles.digit}>9</span>
                <span className={styles.digit}>8</span>
                <span className={styles.digit}>7</span>
                <span className={styles.digit}>6</span>
                <span className={styles.digit}>5</span>
                <span className={styles.digit}>4</span>
                <span className={styles.digit}>3</span>
                <span className={styles.digit}>2</span>
                <span className={styles.digit}>1</span>
                <span className={styles.digit}>0</span>
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }

  const check = () => {
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


  const questionList: string[] = [
    "T=1 D=1 F=2 K=?",
    "場所 教卓のしたとか",
    "WD=木,RM=部屋,DR=人形,PL=?",
    "0, 1, 1, 2, 3, 5, V, 13, 21, 34, 55…の時 X =? <br> 1, W, 27, 64, 125, 216…の時 Y =? <br> 3.1, X, 1, 5, 9, 2, 6, 5…の時 Z =? <br> X + Y - Z=A <br> A を答えよ",
    "暗証番号 4614"
  ]
  const onclick = (key: number) => {
    switch (key) {
      case 9:
        setText(text.slice(0, -1));
        break;
      case 10:
        setText(text + "0")
        break;
      case 11:
        check()
        break;
      default:
        const a: number = key + 1
        setText(text + a.toString())
        break;
    }

  }
  const area = () => {
    const keyboard = () => {
      const items: any[] = []
      for (let i = 0; i < 12; i++) {

        // WTF !?!?!?!
        let k: string | number;
        switch (i) {
          case 9:
            k = "back"
            break;
          case 10:
            k = 0
            break;
          case 11:
            k = "next"
            break;
          default:
            k = i + 1;
            break;
        }

        items.push(
          <>
            <div id={i.toString()} onClick={() => onclick(i)} className="flex justify-center items-center text-lg border border-gray-800 h-12">{k}</div>
          </>
        )

      }
      return (items)
    }
    return (
      <>
        {/* for title */}
        <div className="text-orange-600 font-black text-lg">Enter Code</div>
        {/* for text area */}
        <div>
          <input type="text" value={text} className="w-full h-12 border border-gray-800 bg-inherit my-1.5" />
        </div>
        {/* for keyboard */}
        <div className="grid grid-cols-3 gap-1">
          {keyboard()}
        </div>

      </>
    )
  }


  return (
    <>
      <div className={styles.main}>
        <div className={styles.mainTop}>
        </div>
        <div className={styles.question}>
          <p className={styles.mono} dangerouslySetInnerHTML={{ __html: questionList[pages] }}></p>
        </div>
        {area()}
      </div>
    </>
  )

}

Escape.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title="Layout" noshow back url="/">
      {page}
    </Layout>
  )
}

export default Escape;