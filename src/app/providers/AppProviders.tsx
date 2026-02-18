import { AuthProvider } from "../../app/providers/AuthProvider";
import { ProfileProvider } from "../../app/providers/ProfileProvider";
import { ProductProvider } from "../../app/providers/ProductProvider";
import { CartProvider } from "../../app/providers/CartProvider";
import { OrderProvider } from "../../app/providers/OrderProvider";
import { AckProvider } from "../../app/providers/AckProvider";
import { InvoiceProvider } from "../../app/providers/InvoiceProvider";
import { PaymentProvider } from "../../app/providers/PaymentProvider";

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    <ProfileProvider>
      <ProductProvider>
        <CartProvider>
          <OrderProvider>
            <AckProvider>
              <InvoiceProvider>
                <PaymentProvider>{children}</PaymentProvider>
              </InvoiceProvider>
            </AckProvider>
          </OrderProvider>
        </CartProvider>
      </ProductProvider>
    </ProfileProvider>
  </AuthProvider>
);



