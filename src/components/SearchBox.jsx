import React, { useState, useCallback } from 'react';
import { Form } from 'react-bootstrap';
import { debounce } from 'lodash';

import { useGlobalAutoCompleteContext } from './../hooks/useGlobalAutoCompleteContext';

import SearchResult from './SearchResult';

const SearchBox = () => {
  const [text, setText] = useState('');

  const { results, getAutoCompleteResults, autoCompleteReset } = useGlobalAutoCompleteContext();

  const debouncedGetAutoCompleteResults = debounce((value) => {
    getAutoCompleteResults(value);
  }, [getAutoCompleteResults]);

  const onChangeHandler = (e) => {
    if (e.target.value === '') {
      autoCompleteReset();
      setText('');
    }
    setText(e.target.value);
    debouncedGetAutoCompleteResults(e.target.value);
  };

  const onBlurHandler = () => {
    setTimeout(() => {
      autoCompleteReset();
      setText('');
    }, 100);
  };

  return (
    <div className='search-box'>
      <Form inline>
        <div className='input-group search-md search-sm'>
          <input
            type='search'
            name='q'
            value={text}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            placeholder='Search Location...'
            className='mr-sm-2 ml-sm-3 form-control'
          />
        </div>
      </Form>
      <div className='search-results'>
        {results &&
          results.map((result) => {
            return (
              <SearchResult
                key={result.Key}
                result={result}
                setText={setText}
              />
            );
          })}
      </div>
    </div>
  );
};

export default SearchBox;
