import React, { useContext, useEffect, useState } from 'react';
import { DiaryStateContext } from '../App';
import MyHeader from './../components/MyHeader';
import MyButton from './../components/MyButton';
import DiaryList from '../components/DiaryList';


const Home = () => {

    const diaryList = useContext(DiaryStateContext);

    //월이 바뀌면 다른 월 내용이 보이면 안 됨
    const [data, setData] = useState([]);

    const [curDate, setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth()+1}월`;

    useEffect(() => {
        if(diaryList.length >= 1) {
            const firstDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1
            ).getTime();

            const lastDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth() + 1,
                1
            ).getTime();
            
            setData(diaryList.filter((item) => firstDay <= item.date && item.date < lastDay));
        }
    },[diaryList, curDate]);

    useEffect(() => {
        console.log("data는",data);
    },[data]);

    const increaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()));
    };

    const decreaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate()));
    };
 
  return (
    <div>
      <MyHeader 
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}    
    />
    <DiaryList diaryList={data}/>
    </div>
  )
}

export default Home
