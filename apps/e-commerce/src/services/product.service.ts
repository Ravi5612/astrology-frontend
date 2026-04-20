import { api } from "@/lib/api";

/**
 * Service for Merchant Product Management
 */
export const productService = {
  /**
   * Fetch all products for the logged-in merchant
   */
  getProducts: async (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    const [data, error] = await api.get<any>(`/merchant/products${query}`);
    return [data, error];
  },

  /**
   * Fetch a single product by ID
   */
  getProduct: async (id: string | number) => {
    const [data, error] = await api.get<any>(`/merchant/products/${id}`);
    return [data, error];
  },

  /**
   * Create a new product
   */
  createProduct: async (productData: any) => {
    const [data, error] = await api.post<any>('/merchant/products', productData);
    return [data, error];
  },

  /**
   * Update an existing product
   */
  updateProduct: async (id: string | number, productData: any) => {
    const [data, error] = await api.put<any>(`/merchant/products/${id}`, productData);
    return [data, error];
  },

  /**
   * Delete a product
   */
  deleteProduct: async (id: string | number) => {
    const [data, error] = await api.delete<any>(`/merchant/products/${id}`);
    return [data, error];
  },

  /**
   * Bulk update status for multiple products
   */
  bulkUpdateStatus: async (ids: (string | number)[], status: 'active' | 'out_of_stock') => {
    const [data, error] = await api.patch<any>('/merchant/products/bulk-status', { ids, status });
    return [data, error];
  }
};
