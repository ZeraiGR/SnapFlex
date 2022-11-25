import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchWordDescr,
	selectDefinition,
	selectValid,
	selectWord,
	selectIsFetching
} from './dictionarySlice';
import styles from './Dictionary.module.css';

export function Dictionary() {
  const definition = useSelector(selectDefinition);
  const wordBack = useSelector(selectWord);
  const isValid = useSelector(selectValid);
	const isFetching = useSelector(selectIsFetching);
  const dispatch = useDispatch();
  const [word, setWord] = useState('');

	const handleSubmit = (e, w) => {
		e.preventDefault();
		dispatch(fetchWordDescr(w));
	};

  return (
    <div className={styles.dictionary}>
      <form>
				<input className={styles.input} value={word} type="text" onChange={e => setWord(e.target.value)} />
				<button disabled={word === ''} className={styles.button} type="submit" onClick={(e) => handleSubmit(e, word)}>Look up</button>
			</form>
			<div className={styles.result}>
				{isFetching && <div>Loading...</div>}
				{isValid && <div>{definition}</div>}
				{!isValid && <div>{wordBack}: such the word doesn't exist! Please! Try again!</div>}
			</div>
    </div>
  )
}