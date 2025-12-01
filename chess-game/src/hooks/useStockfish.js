import { useState, useEffect, useRef } from 'react';

export const useStockfish = () => {
  const [engine, setEngine] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const engineRef = useRef(null);

  useEffect(() => {
    // Initialize Stockfish engine
    const initEngine = async () => {
      try {
        const { default: Stockfish } = await import('stockfish');
        const stockfishEngine = Stockfish();
        engineRef.current = stockfishEngine;
        setEngine(stockfishEngine);
        
        // Set up engine event handlers
        stockfishEngine.onmessage = (event) => {
          console.log('Stockfish message:', event.data);
        };
        
        // Set initial parameters
        stockfishEngine.postMessage('uci');
        stockfishEngine.postMessage('isready');
      } catch (error) {
        console.error('Failed to initialize Stockfish:', error);
      }
    };

    initEngine();

    return () => {
      if (engineRef.current) {
        engineRef.current.postMessage('quit');
      }
    };
  }, []);

  const getBestMove = async (fen, depth = 15) => {
    if (!engine) return null;

    return new Promise((resolve) => {
      setIsLoading(true);
      
      const handleMessage = (event) => {
        const message = event.data;
        if (message.startsWith('bestmove')) {
          const bestMove = message.split(' ')[1];
          engine.removeEventListener('message', handleMessage);
          setIsLoading(false);
          resolve(bestMove);
        }
      };

      engine.addEventListener('message', handleMessage);
      engine.postMessage(`position fen ${fen}`);
      engine.postMessage(`go depth ${depth}`);
      
      // Timeout after 5 seconds
      setTimeout(() => {
        engine.removeEventListener('message', handleMessage);
        setIsLoading(false);
        resolve(null);
      }, 5000);
    });
  };

  const analyzePosition = async (fen, depth = 10) => {
    if (!engine) return null;

    return new Promise((resolve) => {
      setIsLoading(true);
      
      const evaluation = { score: 0, bestMove: null };
      
      const handleMessage = (event) => {
        const message = event.data;
        if (message.startsWith('info') && message.includes('score')) {
          const scoreMatch = message.match(/score (cp|mate) (-?\d+)/);
          if (scoreMatch) {
            const [, type, value] = scoreMatch;
            evaluation.score = type === 'mate' ? value * 10000 : parseInt(value);
          }
        }
        
        if (message.startsWith('bestmove')) {
          evaluation.bestMove = message.split(' ')[1];
          engine.removeEventListener('message', handleMessage);
          setIsLoading(false);
          resolve(evaluation);
        }
      };

      engine.addEventListener('message', handleMessage);
      engine.postMessage(`position fen ${fen}`);
      engine.postMessage(`go depth ${depth}`);
      
      // Timeout after 5 seconds
      setTimeout(() => {
        engine.removeEventListener('message', handleMessage);
        setIsLoading(false);
        resolve(evaluation);
      }, 5000);
    });
  };

  const setDifficulty = (level) => {
    if (!engine) return;
    
    const depth = Math.min(Math.max(level, 1), 20);
    engine.postMessage(`setoption name Skill Level value ${level}`);
    engine.postMessage(`setoption name Depth value ${depth}`);
  };

  return {
    engine,
    isLoading,
    getBestMove,
    analyzePosition,
    setDifficulty,
  };
};
