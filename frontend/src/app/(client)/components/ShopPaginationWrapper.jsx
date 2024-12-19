'use client';

import ShopPagination from './ShopPagination';

const ShopPaginationWrapper = ({ currentPage, totalPages }) => {
  return <ShopPagination currentPage={currentPage} totalPages={totalPages} />;
};

export default ShopPaginationWrapper;
