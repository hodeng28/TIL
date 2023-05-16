/* eslint-disable @typescript-eslint/no-explicit-any */
import { CITYHALL_COORDINATE } from '@/consts/constants';
import { atom } from 'jotai';
import { createJSONStorage } from 'jotai/utils';
import { RefObject } from 'react';

type Nil = undefined | null;

export const convertPxToRem = (value: string | number) => {
  if (typeof value === 'string' && value.slice(-2, value.length) === 'px') {
    const onlyNumber = +value.slice(0, value.length - 2);
    return `${onlyNumber / 16}rem`;
  }

  return typeof value === 'number' && `${value / 16}rem`;
};

export const shouldNotForwardProp = (...args: string[]) => ({
  shouldForwardProp: (propName: string) => !args.includes(propName)
});

export const scrollIntoView = (
  ref: RefObject<HTMLElement>,
  block?: 'start' | 'center' | 'end' | 'nearest'
) =>
  ref.current?.scrollIntoView({
    behavior: 'smooth',
    block: block || 'start'
  });

export const scrollTo = (
  ref: RefObject<HTMLElement>,
  scrollPosition = 0,
  isLeftDireciton = false
) =>
  ref.current?.scrollTo(
    isLeftDireciton
      ? {
          left: scrollPosition
        }
      : {
          top: scrollPosition
        }
  );

export const atomWithMountInitialization = <T>(initialValue: T) => {
  const newAtom = atom(initialValue);

  newAtom.onMount = (setAtom) => {
    return () => setAtom(initialValue);
  };

  return newAtom;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const assertNever = (param: never): never => {
  throw new Error('Unexpected value. Should have been never');
};

export const isNil = <T>(param: T | Nil): param is Nil =>
  param === undefined || param === null;

export const sendMessageToDevice = (type: string, body: unknown) =>
  window.isWebViewAccess &&
  window.ReactNativeWebView.postMessage(
    JSON.stringify({
      type,
      body
    })
  );

export const isCityHallCoordinate = ({ lat, lng }: MapCoordinate) =>
  lat === CITYHALL_COORDINATE.lat && lng === CITYHALL_COORDINATE.lng;

export const makeJotaiSessionStorage = () =>
  createJSONStorage(() =>
    typeof window !== 'undefined'
      ? window.sessionStorage
      : (undefined as unknown as Storage)
  );

export const deepEqual = (objA: any, objB: any, map = new WeakMap()) => {
  if (Object.is(objA, objB)) return true;

  if (objA instanceof Date && objB instanceof Date) {
    return objA.getTime() === objB.getTime();
  }
  if (objA instanceof RegExp && objB instanceof RegExp) {
    return objA.toString() === objB.toString();
  }

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false;
  }

  if (map.get(objA) === objB) return true;

  const keysA = Reflect.ownKeys(objA);
  const keysB = Reflect.ownKeys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i++) {
    if (
      !Reflect.has(objB, keysA[i]) ||
      !deepEqual(objA[keysA[i]], objB[keysA[i]], map)
    ) {
      return false;
    }
  }

  return true;
};
