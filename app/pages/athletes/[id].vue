<script setup lang="ts">
const athletesStore = useAthletesStore();
const { currentAthlete: athlete, currentAthletePending: pending } = storeToRefs(athletesStore);

useSeoMeta({
    title: 'Anagrafica',
});
</script>

<template>
    <template v-if="pending">
        <div class="mb-8 flex items-start gap-4">
            <USkeleton class="size-12 rounded-full" />
            <div class="grid gap-2">
                <USkeleton class="h-8 w-62.5" />
                <div class="flex gap-2">
                    <USkeleton class="h-6 w-24" />
                    <USkeleton class="h-6 w-24" />
                </div>
            </div>
        </div>
        <div class="grid gap-8 lg:grid-cols-12">
            <div class="space-y-8 lg:col-span-8">
                <USkeleton class="h-64" />
                <USkeleton class="h-48" />
            </div>
            <div class="space-y-8 lg:col-span-4">
                <USkeleton class="h-64" />
                <USkeleton class="h-48" />
            </div>
        </div>
    </template>
    <template v-else-if="athlete">
        <UUser
            :name="athlete.name"
            size="3xl"
            :avatar="getAvatar(athlete.id.toString(), 100)"
            class="mb-8"
            :ui="{
                root: 'items-start',
                name: 'text-2xl mb-2',
            }"
        >
            <template #description>
                <div class="flex flex-wrap gap-2">
                    <UBadge variant="soft" color="neutral" :label="`${athlete.activity.name} (${athlete.course.name})`" />
                    <UBadge variant="soft" color="neutral" :label="`${athlete.season.starterYear} - ${athlete.season.endYear}`" />
                </div>
            </template>
        </UUser>
        <div class="grid gap-8 lg:grid-cols-12">
            <div class="space-y-8 lg:col-span-8">
                <AthleteCard title="Athlete data" icon="i-lucide-user">
                    <AthleteRecord label="Nome" :value="athlete.name" />
                    <AthleteRecord label="Data di nascita" :value="formatDate(athlete.birthday.toString())" />
                    <AthleteRecord label="Luogo di nascita" :value="athlete.birthplace" />
                    <AthleteRecord label="Codice fiscale" :value="athlete.taxCode" :showCopyButton="true" />
                </AthleteCard>

                <AthleteCard v-if="athlete.parent" title="Parent data" icon="i-lucide-user">
                    <AthleteRecord label="Nome" :value="athlete.parent.name" />
                    <AthleteRecord label="Codice fiscale" :value="athlete.parent.taxCode" :showCopyButton="true" />
                </AthleteCard>

                <AthleteCard title="Address and contacts" icon="i-lucide-notebook">
                    <AthleteRecord label="Città" :value="athlete.city" />
                    <AthleteRecord label="Indirizzo" :value="athlete.address" />
                    <AthleteRecord label="Numero di cellulare" :value="athlete.phoneNumber">
                        <UButton
                            color="primary"
                            variant="ghost"
                            trailingIcon="i-lucide-phone"
                            :to="`tel:${athlete.phoneNumber}`"
                        />
                        <UButton
                            color="primary"
                            variant="ghost"
                            trailingIcon="i-ic-baseline-whatsapp"
                            :to="`https://api.whatsapp.com/send?phone=${athlete.phoneNumber}`"
                            target="_blank"
                        />
                    </AthleteRecord>
                    <AthleteRecord label="Email" :value="athlete.email">
                        <UButton
                            color="primary"
                            variant="ghost"
                            trailingIcon="i-lucide-mail"
                            :to="`mailto:${athlete.email}`"
                        />
                    </AthleteRecord>
                </AthleteCard>

                <AthleteCard title="Certificate" icon="i-lucide-file">
                    <AthleteRecord label="Data scadenza certificato" :value="formatDate(athlete.certificateExpirationDate?.toString())" />
                    <AthleteRecord label="Download certificato" :value="athlete.certificateDownloadUrl || EMPTY_VALUE" />
                </AthleteCard>
            </div>
            <div class="lg:col-span-4">
                <div class="space-y-8 lg:sticky lg:top-[calc(var(--ui-header-height)+var(--spacing)*8)]">
                    <AthleteCard title="Sport" icon="i-lucide-volleyball">
                        <AthleteRecord label="Stagione" :value="`${athlete.season.starterYear} - ${athlete.season.endYear}`" />
                        <AthleteRecord label="Attività" :value="athlete.activity.name" />
                        <AthleteRecord label="Corso" :value="athlete.course.name" />
                    </AthleteCard>

                    <AthleteCard title="Payment" icon="i-lucide-credit-card">
                        <AthleteRecord label="Acconto volley" :value="formatPrice(athlete.volleyAccount?.toString())" />
                        <AthleteRecord label="Saldo volley" :value="formatPrice(athlete.volleyBalance?.toString())" />
                        <AthleteRecord label="Saldo volley 2" :value="formatPrice(athlete.volleyBalanceSecondary?.toString())" />
                        <AthleteRecord label="1^ rata" :value="formatPrice(athlete.firstInstallment?.toString())" />
                        <AthleteRecord label="2^ rata" :value="formatPrice(athlete.secondInstallment?.toString())" />
                        <AthleteRecord label="3^ rata" :value="formatPrice(athlete.thirdInstallment?.toString())" />
                    </AthleteCard>
                </div>
            </div>
        </div>
    </template>
</template>
