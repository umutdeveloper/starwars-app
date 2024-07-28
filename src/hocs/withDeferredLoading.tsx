import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Box } from '@mui/material';

type WPropsOptional<T> = keyof T extends never ? { wProps?: { [K in keyof T]: T[K] } } : { wProps: { [K in keyof T]: T[K] } };
type PPropsOptional<T> = keyof T extends never ? { pProps?: { [K in keyof T]: T[K] } } : { pProps: { [K in keyof T]: T[K] } };
type HOCPropsWithOptional<W, P> = WPropsOptional<W> & PPropsOptional<P> & { disabled?: boolean };

const withDeferredLoading = <W extends { [K in keyof W]: W[K] }, P extends { [K in keyof P]: P[K] }>(
  WrappedComponent: React.ComponentType<W>,
  PlaceholderComponent: React.ComponentType<P>
) => {
  const HOC: React.FC<HOCPropsWithOptional<W, P>> = (props) => {
    const { ref, inView } = useInView({
      triggerOnce: true,
    });

    return <Box ref={ref}>{inView && !props.disabled ? <WrappedComponent {...(props.wProps as W)} /> : <PlaceholderComponent {...(props.pProps as P)} />}</Box>;
  };

  return HOC;
};

export default withDeferredLoading;
