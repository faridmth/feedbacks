'use client'
import { createContext, useContext, useState } from 'react';

const CommentsContext = createContext();

export function CommentsProvider({ children }) {
  const [refreshComments, setRefreshComments] = useState(0);

  const triggerRefresh = () => {
    setRefreshComments(prev => prev + 1);
  };

  return (
    <CommentsContext.Provider value={{ refreshComments, triggerRefresh }}>
      {children}
    </CommentsContext.Provider>
  );
}

export function useComments() {
    return useContext(CommentsContext);
}