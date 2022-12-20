// import { useEffect } from 'react';
import { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { DataFull } from '~/data/DataFull';
import { useKidsPreSchoolSlice } from '~/redux/slice';
import { selectIdMenu } from '~/redux/slice/selectors';

function useRandomQuestion() {
  // console.log('1');
  const idMenu = useSelector(selectIdMenu);
  const dispatch = useDispatch();
  const dataQuestion = DataFull[idMenu];
  const itemRandom = [...dataQuestion].sort(() => 0.5 - Math.random());
  const { actions } = useKidsPreSchoolSlice();
  const items = itemRandom.slice(0, 4);
  const image = items[Math.floor(Math.random() * items.length)].image;
  // // console.log('2', items);
  const action1 = useMemo(
    () => ({
      randomQuestionChoose() {
        dispatch(actions.randomQuestion(items));
      },
      randomAnswer() {
        dispatch(actions.randomAnswer(image));
      },
    }),
    [items],
  );

  return action1;
}
// dispatch(actions.randomQuestion(items));
// dispatch(actions.randomAnswer(image));
export default useRandomQuestion;
