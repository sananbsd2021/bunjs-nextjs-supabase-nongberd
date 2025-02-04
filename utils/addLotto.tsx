import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const addLotto = async (lottoData: { number: string; prize: string, type: string }) => {
  // Fetch the authenticated user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error("User not authenticated.");
  }

  // Insert lotto data linked with the authenticated user
  const { error: insertError } = await supabase
    .from("lottos")
    .insert({
      ...lottoData,
      users_id: user?.id, // Associate the lotto with the logged-in user
    });

  if (insertError) {
    throw new Error(insertError.message);
  }
};
