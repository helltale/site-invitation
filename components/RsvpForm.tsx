"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { formOptions, wedding } from "@/lib/wedding";
import { assets } from "@/lib/design";
import { rsvpSchema, type RsvpInput } from "@/lib/rsvp-schema";

const inputClass =
  "w-full h-[50px] rounded-full border border-brown-dark bg-transparent px-5 text-xs text-brown-dark outline-none placeholder:text-brown-dark/50 focus:ring-1 focus:ring-brown-dark/30";

const defaultValues: Partial<RsvpInput> = {
  familyName: "",
  guestNames: "",
  phone: "",
  alcohol: [],
  hotFood: [],
  website: "",
};

function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="mb-1 block text-sm text-brown-dark">
      {children}
      {required && <span className="text-brown"> *</span>}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-700">{message}</p>;
}

export function RsvpForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RsvpInput>({
    resolver: zodResolver(rsvpSchema),
    defaultValues,
  });

  const attendance = useWatch({ control, name: "attendance" });
  const attending = attendance === "yes";

  const onSubmit = handleSubmit(async (data) => {
    setSubmitError(null);
    const response = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => ({}))) as {
        error?: string;
      };
      setSubmitError(
        payload.error ?? "Не удалось отправить. Попробуйте ещё раз.",
      );
      return;
    }

    setSubmitted(true);
  });

  if (submitted) {
    return (
      <div className="rounded-2xl border border-brown-dark/20 bg-cream-dark/50 p-8 text-center">
        <p className="text-lg font-light tracking-wide text-brown-dark">
          Спасибо! Мы получили ваш ответ
        </p>
        <p className="mt-4 text-sm text-brown-dark/70">
          С нетерпением ждём встречи!
        </p>
        <a
          href={wedding.contacts.telegram}
          className="mt-6 inline-block text-sm text-brown underline"
        >
          {wedding.contacts.telegramLabel}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-[320px] space-y-5" noValidate>
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        {...register("website")}
      />

      <div>
        <FieldLabel required>Ваша фамилия:</FieldLabel>
        <input
          id="familyName"
          placeholder="Ивановы"
          className={inputClass}
          {...register("familyName")}
        />
        <FieldError message={errors.familyName?.message} />
      </div>

      <div>
        <FieldLabel required>Ваше имя:</FieldLabel>
        <p className="mb-2 text-xs text-brown-dark/60">
          Если вы придёте со своей парой, напишите пожалуйста ваши имена
        </p>
        <input
          id="guestNames"
          placeholder="Владимир и Наталья"
          className={inputClass}
          {...register("guestNames")}
        />
        <FieldError message={errors.guestNames?.message} />
      </div>

      <div>
        <FieldLabel required>Номер вашего телефона</FieldLabel>
        <input
          id="phone"
          type="tel"
          placeholder="+7 (999) 123-45-67"
          inputMode="tel"
          className={inputClass}
          {...register("phone")}
        />
        <FieldError message={errors.phone?.message} />
      </div>

      <fieldset>
        <FieldLabel required>Присутствие:</FieldLabel>
        <div className="mt-2 space-y-2">
          {(
            [
              { value: "yes", label: formOptions.attendanceYes },
              { value: "no", label: formOptions.attendanceNo },
            ] as const
          ).map(({ value, label }) => (
            <label
              key={value}
              className="flex cursor-pointer items-start gap-2 text-[11px] leading-snug text-brown-dark"
            >
              <input
                type="radio"
                value={value}
                {...register("attendance")}
                className="mt-0.5 h-4 w-4 shrink-0 accent-brown"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
        <FieldError message={errors.attendance?.message} />
      </fieldset>

      {attending && (
        <div className="space-y-5 border-t border-brown-dark/10 pt-5">
          <fieldset>
            <FieldLabel>Что предпочитаете из алкоголя?</FieldLabel>
            <div className="mt-2 space-y-2">
              {formOptions.alcohol.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-2 text-[11px] text-brown-dark"
                >
                  <input
                    type="checkbox"
                    value={option}
                    {...register("alcohol")}
                    className="h-4 w-4 accent-brown"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <FieldLabel>Что предпочитаете на горячее?</FieldLabel>
            <div className="mt-2 space-y-2">
              {formOptions.hotFood.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-2 text-[11px] text-brown-dark"
                >
                  <input
                    type="checkbox"
                    value={option}
                    {...register("hotFood")}
                    className="h-4 w-4 accent-brown"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {(
            [
              {
                name: "creativeGift" as const,
                title: "Планируете ли творческий подарок для пары?",
              },
              {
                name: "transfer" as const,
                title: "Понадобится ли вам трансфер на банкет / с банкета",
              },
              {
                name: "contests" as const,
                title: "Будете участвовать в творческих конкурсах?",
              },
            ] as const
          ).map(({ name, title }) => (
            <fieldset key={name}>
              <FieldLabel>{title}</FieldLabel>
              <div className="mt-2 flex gap-4">
                {(["yes", "no"] as const).map((value) => (
                  <label
                    key={value}
                    className="flex cursor-pointer items-center gap-2 text-[11px] text-brown-dark"
                  >
                    <input
                      type="radio"
                      value={value}
                      {...register(name)}
                      className="h-4 w-4 accent-brown"
                    />
                    <span>{value === "yes" ? "Да" : "Нет"}</span>
                  </label>
                ))}
              </div>
              <FieldError message={errors[name]?.message} />
            </fieldset>
          ))}

          <div>
            <FieldLabel>
              Без какой музыки не представляете себе классный праздник?
            </FieldLabel>
            <input
              placeholder="Агутин — Остров"
              className={inputClass}
              {...register("music")}
            />
          </div>

          <div>
            <FieldLabel>Есть какие-то пищевые особенности?</FieldLabel>
            <input
              placeholder="Аллергия, вегетарианство"
              className={inputClass}
              {...register("dietary")}
            />
          </div>
        </div>
      )}

      {submitError && (
        <p className="rounded-full bg-red-50 px-4 py-2 text-xs text-red-800">
          {submitError}
        </p>
      )}

      <div className="flex justify-center pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-[29px] items-center justify-center rounded-full bg-brown px-8 py-2 transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="text-xs text-white">Отправляем…</span>
          ) : (
            <Image
              src={assets.rsvp.submit}
              alt="Отправить"
              width={53}
              height={5}
              className="h-auto w-[53px]"
            />
          )}
        </button>
      </div>

      <p className="text-center text-[10px] leading-snug text-brown-dark/50">
        {wedding.rsvp.privacyNote}
      </p>
    </form>
  );
}
