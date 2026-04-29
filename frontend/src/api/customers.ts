/* DOMAIN — typed Customer API client */
import { apiClient } from './axios'
import type {
  Customer,
  CustomerInput,
  CustomerListParams,
  CustomerListResponse,
  PageMeta,
} from '@/types/customer'

interface ListEnvelope {
  success: boolean
  data: Customer[]
  meta: PageMeta
}

interface SingleEnvelope {
  success: boolean
  data: Customer
}

export async function listCustomersApi(
  params: CustomerListParams,
): Promise<CustomerListResponse> {
  const res = await apiClient.get<ListEnvelope>('/customers', { params })
  return { data: res.data.data, meta: res.data.meta }
}

export async function getCustomerApi(customerID: string): Promise<Customer> {
  const res = await apiClient.get<SingleEnvelope>(`/customers/${customerID}`)
  return res.data.data
}

export async function createCustomerApi(input: CustomerInput): Promise<Customer> {
  const res = await apiClient.post<SingleEnvelope>('/customers', input)
  return res.data.data
}

export async function updateCustomerApi(
  customerID: string,
  input: CustomerInput,
): Promise<Customer> {
  const res = await apiClient.put<SingleEnvelope>(`/customers/${customerID}`, input)
  return res.data.data
}

export async function deleteCustomerApi(customerID: string): Promise<void> {
  await apiClient.delete(`/customers/${customerID}`)
}
