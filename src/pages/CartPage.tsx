import React from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/SEOHead';
import { Trash2, AlertCircle } from 'lucide-react';
import { formatINR } from '@/data/testsData';

const CartPage = () => {
  const { cartItems, removeFromCart, totalAmount } = useCart();
  const navigate = useNavigate();

  return (
    <Layout>
      <SEOHead title="My Cart - Diagnostics Hub" description="Review and book your health tests" />
      <div className="bg-slate-50 min-h-screen py-10">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl pt-2 font-semibold text-slate-800">Test Added</h1>
            <Button variant="default" className="bg-[#003B73] hover:bg-[#002B54]" asChild>
              <Link to="/tests">+ Add More Tests</Link>
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-4">
              {cartItems.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-xl border border-slate-100 shadow-sm">
                  <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trash2 className="w-8 h-8 text-slate-400" />
                  </div>
                  <h2 className="text-xl font-medium text-slate-800 mb-2">Your cart is empty</h2>
                  <p className="text-slate-500 mb-6">Looks like you haven't added any tests yet.</p>
                  <Button asChild>
                    <Link to="/tests">Browse Tests</Link>
                  </Button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 sm:p-5 flex flex-col gap-3">
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1">
                        <h3 className="text-[14px] sm:text-[15px] font-bold text-slate-800 uppercase leading-snug">
                          {item.name} <span className="text-[#3B8B41] whitespace-nowrap inline-block ml-1">{formatINR(item.discountPrice || item.price)}</span>
                        </h3>
                        <p className="text-[11px] sm:text-xs font-medium text-slate-500 flex items-center gap-1 mt-1">
                          {item.parametersCount || 1} Parameter(s) Covered
                          <AlertCircle className="w-3.5 h-3.5 text-blue-500" />
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 border border-slate-100 rounded-md p-3 text-[12px] sm:text-[13px] text-slate-600 sm:w-4/5">
                      {item.fastingRequired ? "Overnight fasting is preferred." : "No special preparation required"}
                    </div>
                    
                    <div className="flex justify-end mt-2">
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-1 text-[#DE6F53] hover:text-[#C2583F] font-bold text-[13px] transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="w-full lg:w-96 shrink-0">
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden sticky top-24">
                <div className="p-5 border-b border-slate-100">
                  <h3 className="text-lg font-medium text-slate-800">Amount to be paid</h3>
                </div>
                
                <div className="p-5 space-y-4">
                  <div className="flex justify-between items-center text-sm font-medium text-slate-600">
                    <span>Sub Total</span>
                    <span>{formatINR(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-medium text-slate-600">
                    <span>Total</span>
                    <span>{formatINR(totalAmount)}</span>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-sm font-bold text-slate-800 hidden">
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold text-slate-800 pt-1">
                    <span>Net Payable Amount</span>
                    <span>{formatINR(totalAmount)}</span>
                  </div>
                  
                  <Button 
                    className="w-full mt-6 bg-[#004A99] hover:bg-[#003B73] h-12 text-[15px] rounded-lg font-semibold"
                    disabled={cartItems.length === 0}
                    onClick={() => navigate('/book-appointment')}
                  >
                    Proceed / Add patient
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
