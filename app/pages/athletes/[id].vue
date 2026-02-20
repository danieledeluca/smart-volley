<script setup lang="ts">
const athletesStore = useAthletesStore();
const { currentAthlete: athlete, currentAthletePending: pending } = storeToRefs(athletesStore);
</script>

<template>
    <div class="grid grid-cols-2 gap-8">
        <template v-if="pending">
            <USkeleton class="h-56" />
            <USkeleton class="h-56" />
            <USkeleton class="h-56" />
            <USkeleton class="h-56" />
            <USkeleton class="h-56" />
            <USkeleton class="h-56" />
        </template>
        <template v-else-if="athlete">
            <AthleteCard title="Athlete data" icon="i-lucide-user">
                <AthleteRecord label="Nome" :value="athlete.name" />
                <AthleteRecord label="Data di nascita" :value="formatDate(athlete.birthday.toString())" />
                <AthleteRecord label="Luogo di nascita" :value="athlete.birthplace" />
                <AthleteRecord label="Codice fiscale" :value="athlete.taxCode" :showCopyButton="true" />
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
            <AthleteCard v-if="athlete.parent" title="Parent data" icon="i-lucide-user">
                <AthleteRecord label="Nome" :value="athlete.parent.name" />
                <AthleteRecord label="Codice fiscale" :value="athlete.parent.taxCode" :showCopyButton="true" />
            </AthleteCard>
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
            <AthleteCard title="Certificate" icon="i-lucide-file">
                <AthleteRecord label="Data scadenza certificato" :value="formatDate(athlete.certificateExpirationDate?.toString())" />
                <AthleteRecord label="Download certificato" :value="athlete.certificateDownloadUrl || EMPTY_VALUE" />
            </AthleteCard>
        </template>
    </div>
</template>
