import { PublicKey } from "@metaplex-foundation/js";
import { SolanaProgramEdu } from "./solana_program_edu";

export const AKA_TOKEN_PROGRAM_ID = new PublicKey(
  "E9TFDbmFeVLGFv6orR4wjtWgkrMwcYXkUeBPiS5UYxmz"
);

export type SolanaProgramEduIdl = SolanaProgramEdu;
export const COURSE_SEED = "course";
export const CARD_SEED = "card";
export const ENROLLMENT_SEED = "enrollment";
export const TREASURER_SEED = "treasurer";
export const CERT_SEED = "cert";
export const CERTIFICATE_IMAGE =
  "https://arweave.net/hAJ-V8olXULWQmFLpHuC_mUeAJYBK4daH1nPYZ6Q_Do";
