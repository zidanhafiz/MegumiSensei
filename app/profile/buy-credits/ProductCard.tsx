"use client";
import { TbCoins } from "react-icons/tb";
import { FaCartShopping } from "react-icons/fa6";
import { Credit } from "@/types/tableTypes";

export default function ProductCard({ product, handleBuy, isPending }: { product: Credit; handleBuy: (id: number, sku: string) => void; isPending: boolean }) {
  return (
    <div className='border border-primary-content rounded-lg p-4 hover:shadow-md transition-shadow'>
      <div className='space-y-5'>
        <div className='flex justify-between items-start'>
          <div>
            <TbCoins
              className='text-secondary'
              size={24}
            />
            <h4 className='font-bold text-xl'>{product.amount} Kredit</h4>
          </div>
          <div>
            <p className='font-medium text-lg text-end'>Rp {product.price.toLocaleString()}</p>
            <span className='text-xs text-gray-500'>Sudah termasuk PPN</span>
          </div>
        </div>
        <button
          className='btn btn-primary w-full'
          onClick={() => handleBuy(product.id, product.sku)}
          disabled={isPending}
        >
          <FaCartShopping size={14} />
          Beli
        </button>
      </div>
    </div>
  );
}
