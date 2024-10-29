import React, { useEffect, useRef } from 'react';
import DotsLoader from './DotsLoader';

const LazyLoading = (props) => {
    const loader_ref = useRef();
    const callback = (entries) => {
        entries.forEach((entry) => {
            if (
                entry.isIntersecting &&
                !props.loading &&
                !props.isLastPage
            ) {
                props.onPagination()
            }
        });
    };
    const options = {
        threshold: 1.0,
        rootMargin: "30px",
    };
    const observer = new IntersectionObserver(callback, options);
    useEffect(() => {
        if (loader_ref.current) {
            observer.observe(loader_ref.current);
        }
        return () => {
            observer.disconnect();
        };
    }, [
        props.loading, props.data
    ]);
    return (
        <div className="loaderSpace" ref={(ref) => loader_ref.current = ref}>
            {props.loading && (
                <DotsLoader />
            )}
        </div>
    );
};

export default LazyLoading;