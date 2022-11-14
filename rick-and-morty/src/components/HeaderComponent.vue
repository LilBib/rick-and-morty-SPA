<template>
    <div class="flex justify-between px-9 h-20 bg-slate-200">
        <img src="../icons/logo.svg" alt="Логотип проекта">
        <nav class="h-full">
            <ul class="flex items-center h-full">
                <li class="cursor-pointer hover:opacity-70 mr-2">
                    <router-link to="/">Список персонажей</router-link>
                </li>
                <li class="cursor-pointer hover:opacity-70">
                    <router-link to="/saved">Избранное</router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
</script>
