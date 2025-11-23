module.exports = [
"[project]/lib/supabase/admin.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAdminClient",
    ()=>createAdminClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$supabase$2d$js$40$2$2e$81$2e$1$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@supabase+supabase-js@2.81.1/node_modules/@supabase/supabase-js/dist/module/index.js [app-rsc] (ecmascript) <locals>");
;
function createAdminClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$supabase$2d$js$40$2$2e$81$2e$1$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://ylyguusbttcdvntpwiho.supabase.co"), process.env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
}
}),
"[project]/app/actions/admin-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0034fbf8293d8d494690fb1675fdb7113e973caad2":"listUsers","40e18285fc9b5533af0933d838e2c31e5812d78b9a":"createUser","602a22d28c87c5762808175c3570fe28739abebe37":"toggleUserStatus","60be7ad7a9c41c8d92920db9838d5394f75eb09389":"resetUserPassword"},"",""] */ __turbopack_context__.s([
    "createUser",
    ()=>createUser,
    "listUsers",
    ()=>listUsers,
    "resetUserPassword",
    ()=>resetUserPassword,
    "toggleUserStatus",
    ()=>toggleUserStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/admin.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/external.js [app-rsc] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
const createUserSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email(),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(6),
    fullName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2),
    role: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'user',
        'support',
        'admin'
    ])
});
async function listUsers() {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    // Get all profiles first
    const { data: profiles, error: profilesError } = await supabase.from('profiles').select('*').order('created_at', {
        ascending: false
    });
    if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        return {
            error: profilesError.message
        };
    }
    // Get auth users to match emails (since profiles might not have email if we didn't sync it perfectly, 
    // but usually we rely on auth.users for email. 
    // However, we can't join auth.users easily with client SDK.
    // So we fetch all users from auth.admin and map them.)
    const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
    if (authError) {
        console.error('Error fetching auth users:', authError);
        return {
            error: authError.message
        };
    }
    // Merge data
    const combinedUsers = profiles.map((profile)=>{
        const authUser = users.find((u)=>u.id === profile.id);
        return {
            ...profile,
            email: authUser?.email,
            last_sign_in_at: authUser?.last_sign_in_at
        };
    });
    return {
        data: combinedUsers
    };
}
async function createUser(formData) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const rawData = {
        email: formData.get('email'),
        password: formData.get('password'),
        fullName: formData.get('fullName'),
        role: formData.get('role')
    };
    const validated = createUserSchema.safeParse(rawData);
    if (!validated.success) {
        return {
            error: validated.error.flatten().fieldErrors
        };
    }
    const { email, password, fullName, role } = validated.data;
    // 1. Create Auth User
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
            full_name: fullName
        }
    });
    if (authError) {
        return {
            error: authError.message
        };
    }
    if (!authUser.user) {
        return {
            error: 'Failed to create user'
        };
    }
    // 2. Update Profile with Role and Force Password Reset
    // The trigger creates the profile with default 'user' role. We need to update it.
    const { error: profileError } = await supabase.from('profiles').update({
        role: role,
        must_change_password: true
    }).eq('id', authUser.user.id);
    if (profileError) {
        // Cleanup if profile update fails? Or just report error.
        return {
            error: 'User created but failed to update profile role: ' + profileError.message
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin');
    return {
        success: true
    };
}
async function toggleUserStatus(userId, isActive) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    // 1. Update Profile
    const { error: profileError } = await supabase.from('profiles').update({
        is_active: isActive
    }).eq('id', userId);
    if (profileError) {
        return {
            error: profileError.message
        };
    }
    // 2. Ban/Unban in Auth (Optional but good for security)
    if (!isActive) {
        const { error: banError } = await supabase.auth.admin.updateUserById(userId, {
            ban_duration: '876000h'
        });
        if (banError) console.error('Error banning user:', banError);
    } else {
        const { error: unbanError } = await supabase.auth.admin.updateUserById(userId, {
            ban_duration: '0'
        });
        if (unbanError) console.error('Error unbanning user:', unbanError);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin');
    return {
        success: true
    };
}
async function resetUserPassword(userId, newPassword) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const { error } = await supabase.auth.admin.updateUserById(userId, {
        password: newPassword
    });
    if (error) {
        return {
            error: error.message
        };
    }
    // Set flag to force change on next login
    await supabase.from('profiles').update({
        must_change_password: true
    }).eq('id', userId);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin');
    return {
        success: true
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    listUsers,
    createUser,
    toggleUserStatus,
    resetUserPassword
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(listUsers, "0034fbf8293d8d494690fb1675fdb7113e973caad2", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createUser, "40e18285fc9b5533af0933d838e2c31e5812d78b9a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(toggleUserStatus, "602a22d28c87c5762808175c3570fe28739abebe37", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(resetUserPassword, "60be7ad7a9c41c8d92920db9838d5394f75eb09389", null);
}),
"[project]/.next-internal/server/app/admin/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/auth-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/app/actions/admin-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$auth$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/auth-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$admin$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/admin-actions.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
}),
"[project]/.next-internal/server/app/admin/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/auth-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/app/actions/admin-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "0034fbf8293d8d494690fb1675fdb7113e973caad2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$admin$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["listUsers"],
    "00478dc19c25d68685b5311d665bfb9fe6b61edb59",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$auth$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logout"],
    "407b8a3154c7a0c34448a3ca2e7ebad839bad6ded1",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$auth$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["signup"],
    "40ce5fd73ec76a24efd689a60e920e004537f4ca8c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$auth$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["login"],
    "40e18285fc9b5533af0933d838e2c31e5812d78b9a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$admin$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createUser"],
    "602a22d28c87c5762808175c3570fe28739abebe37",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$admin$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toggleUserStatus"],
    "60be7ad7a9c41c8d92920db9838d5394f75eb09389",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$admin$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resetUserPassword"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$actions$2f$auth$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$app$2f$actions$2f$admin$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/admin/page/actions.js { ACTIONS_MODULE0 => "[project]/app/actions/auth-actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/app/actions/admin-actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$auth$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/auth-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$admin$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/admin-actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_4e8f2287._.js.map