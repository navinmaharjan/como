'use client';

import { Pagination } from '@nextui-org/react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const ShopPagination = ({ currentPage, totalPages }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <div className="w-full flex justify-center items-center mt-4">
        <Pagination
          showControls
          loop
          total={totalPages}
          initialPage={currentPage}
          page={currentPage}
          onChange={handlePageChange}
          radius="full"
          size="sm"
        />
      </div>
    </div>
  );
};

export default ShopPagination;
