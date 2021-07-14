// import { getAllMessages } from '../../api';
// import { useEffect } from 'react';
import MessageCard from './MessageCard';

export default function AllMessages() {
  // useEffect(() => {
  //   async function fetchData() {
  //     const { data } = await getAllMessages();
  //     console.log(data);
  //   }
  //   fetchData();
  // });
  return (
    <MessageCard
      showType={true}
      id={1}
      type="complaint"
      fromName="syy"
      fromSex="1"
      toName="zky"
      toSex="2"
      time="2021/7/14 18:38"
      message="lol"
      anonymous={true}
      likes={1}
      imageUrl=""
      comments={[{ time: '2021-07-14T21:59:13.487+08:00', name: 'jsassssun', comment: 'lol' }]}
    />
  );
}
