import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/libs/stripe";
import { getUrl } from "@/libs/helpers";
import { createOrRetrieveCustomer } from "@/libs/supabaseAdmin";

export async function POST(request: Request) {
  const { price, quantity = 1, metadata = {} } = await request.json();
  try {
    const supabase = createRouteHandlerClient({
      cookies,
    });
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const customer = await createOrRetrieveCustomer({
      uuid: user?.id || "",
      email: user?.email || "",
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "required",
      mode: "subscription",
      customer,
      line_items: [
        {
          price: price.id,
          quantity: quantity,
        },
      ],
      allow_promotion_codes: true,
      subscription_data: {
        trial_period_days: 30,
        metadata: metadata,
      },
      success_url: `${getUrl()}/account`,
      cancel_url: `${getUrl()}`,
    });
    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
