import { useRef, useEffect, useState, useCallback } from 'react';

interface BottomSheetMetrics {
  touchStart: {
    sheetY?: number;
    touchY: number;
  };
  touchMove: {
    prevTouchY?: number;
    movingDirection: 'up' | 'down' | 'none';
  };
  isContentAreaTouched: boolean;
}

export type BottomSheetInfo = ReturnType<typeof useBottomSheet>;

const MIN_HEIGHT = 200;

const useBottomSheet = () => {
  const handleRef = useRef<HTMLDivElement>(null);
  const bottomSheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);
  const [bottomSheetHeight, setBottomSheetHeight] = useState(0);

  const initialTranslateY = bottomSheetHeight - MIN_HEIGHT;

  const metrics = useRef<BottomSheetMetrics>({
    touchStart: {
      sheetY: 0,
      touchY: 0
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: 'none'
    },
    isContentAreaTouched: false
  });

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.style.setProperty('transform', 'translateY(0)');
    setIsOpen(true);
  }, []);

  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.style.setProperty(
      'transform',
      `translateY(${initialTranslateY}px)`
    );
    setIsOpen(false);
  }, [initialTranslateY]);

  const onClickOpenSheet = () => {
    if (!editing) {
      bottomSheetRef.current?.style.setProperty('transform', 'translateY(0)');
      setIsOpen(true);
    }
    setEditing((editing) => !editing);
  };

  useEffect(() => {
    setMaxHeight(window.innerHeight - 64);
    setBottomSheetHeight(window.innerHeight - MIN_HEIGHT);
  }, []);

  useEffect(() => {
    const canUserMoveBottomSheet = () => {
      const { touchMove, isContentAreaTouched } = metrics.current;
      if (!isContentAreaTouched) {
        return true;
      }

      if (bottomSheetRef.current?.getBoundingClientRect().y !== MIN_HEIGHT) {
        return true;
      }

      if (touchMove.movingDirection === 'down') {
        // console.log(
        //   'contentRef.current.scrollTop',
        //   contentRef.current.scrollTop
        // );
        // if (!contentRef.current?.scrollTop) {
        //   return true;
        // }
        // return contentRef.current?.scrollTop <= 0;
        return true;
      }

      return false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      const { touchStart } = metrics.current;

      touchStart.sheetY = bottomSheetRef.current?.getBoundingClientRect().y;
      touchStart.touchY = e.touches[0].clientY;

      metrics.current.isContentAreaTouched = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const { touchStart, touchMove } = metrics.current;
      if (touchStart.sheetY === undefined) {
        return;
      }

      const currentTouchInfor = e.touches[0];

      if (!touchMove.prevTouchY) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      if (touchMove.prevTouchY < currentTouchInfor.clientY) {
        touchMove.movingDirection = 'down';
      }

      if (touchMove.prevTouchY > currentTouchInfor.clientY) {
        touchMove.movingDirection = 'up';
      }

      if (canUserMoveBottomSheet()) {
        const touchOffset = currentTouchInfor.clientY - touchStart.touchY;
        let nextSheetY = touchStart.sheetY + touchOffset;

        if (nextSheetY <= MIN_HEIGHT) {
          nextSheetY = MIN_HEIGHT;
        }

        if (nextSheetY >= maxHeight) {
          nextSheetY = maxHeight;
        }

        bottomSheetRef.current?.style.setProperty(
          'transform',
          `translateY(${nextSheetY - MIN_HEIGHT}px)`
        );
        setIsOpen(false);
      } else {
        // e.preventDefault();
        document.body.style.overflowY = 'hidden';
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      document.body.style.overflowY = 'auto';
      const { touchMove } = metrics.current;

      // Snap Animation: touchend시에 한번에 올라가거나 내려가는 애니메이션
      const currentSheetY = bottomSheetRef.current?.getBoundingClientRect().y;

      if (currentSheetY !== MIN_HEIGHT) {
        if (touchMove.movingDirection === 'up') {
          bottomSheetRef.current?.style.setProperty(
            'transform',
            'translateY(0)'
          );
          setIsOpen(true);
        }

        if (touchMove.movingDirection === 'down') {
          bottomSheetRef.current?.style.setProperty(
            'transform',
            `translateY(${initialTranslateY}px)`
          );
          setIsOpen(false);
        }
      }

      // metrics 초기화.
      metrics.current = {
        touchStart: {
          sheetY: 0,
          touchY: 0
        },
        touchMove: {
          prevTouchY: 0,
          movingDirection: 'none'
        },
        isContentAreaTouched: false
      };
    };

    handleRef.current?.addEventListener('touchstart', handleTouchStart);
    handleRef.current?.addEventListener('touchmove', handleTouchMove);
    handleRef.current?.addEventListener('touchend', handleTouchEnd);

    return () => {
      handleRef.current?.removeEventListener('touchstart', handleTouchStart);
      handleRef.current?.removeEventListener('touchmove', handleTouchMove);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      handleRef.current?.removeEventListener('touchend', handleTouchEnd);
    };
  }, [initialTranslateY, maxHeight]);

  return {
    bottomSheetRef,
    contentRef,
    bottomSheetHeight,
    initialTranslateY,
    editing,
    handleRef,
    isOpen,
    onClickOpenSheet,
    closeBottomSheet,
    openBottomSheet,
    setEditing
  };
};

export default useBottomSheet;
