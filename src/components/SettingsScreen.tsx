import React from 'react';

const SettingsScreen: React.FC = () => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display group/design-root overflow-x-hidden">
      {/* TopAppBar */}
      <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10 border-b border-white/5">
        <div className="flex size-12 shrink-0 items-center text-slate-800 dark:text-white">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </div>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1">Settings</h2>
      </div>

      <div className="flex-grow">
        {/* APPEARANCE Section */}
        <h3 className="text-slate-500 dark:text-slate-400 text-sm font-bold leading-tight tracking-wide px-4 pb-2 pt-6 uppercase">APPEARANCE</h3>
        <div className="flex items-center gap-4 bg-background-light dark:bg-background-dark px-4 min-h-[72px] py-2">
          <div className="text-slate-800 dark:text-white flex items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-800 shrink-0 size-12">
            <span className="material-symbols-outlined text-2xl">contrast</span>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-slate-900 dark:text-white text-base font-medium leading-normal line-clamp-1">Theme</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal line-clamp-2">System default</p>
          </div>
        </div>
        <hr className="border-slate-200 dark:border-slate-800 mx-4"/>
        <div className="flex items-center gap-4 bg-background-light dark:bg-background-dark px-4 min-h-[72px] py-2">
          <div className="text-slate-800 dark:text-white flex items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-800 shrink-0 size-12">
            <span className="material-symbols-outlined text-2xl">palette</span>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-slate-900 dark:text-white text-base font-medium leading-normal line-clamp-1">Accent Color</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal line-clamp-2">Blue</p>
          </div>
        </div>

        {/* PLAYBACK Section */}
        <h3 className="text-slate-500 dark:text-slate-400 text-sm font-bold leading-tight tracking-wide px-4 pb-2 pt-6 uppercase">PLAYBACK</h3>
        <div className="flex items-center gap-4 bg-background-light dark:bg-background-dark px-4 min-h-14 py-2 justify-between">
          <div className="flex items-center gap-4">
            <div className="text-slate-800 dark:text-white flex items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-800 shrink-0 size-10">
              <span className="material-symbols-outlined text-2xl">swap_horiz</span>
            </div>
            <p className="text-slate-900 dark:text-white text-base font-normal leading-normal flex-1 truncate">Crossfade</p>
          </div>
          <div className="shrink-0">
            <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none bg-slate-300 dark:bg-slate-700 p-0.5 has-[:checked]:justify-end has-[:checked]:bg-primary">
              <div className="h-full w-[27px] rounded-full bg-white" style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 0px 3px 8px, rgba(0, 0, 0, 0.06) 0px 3px 1px' }}></div>
              <input checked className="invisible absolute" type="checkbox"/>
            </label>
          </div>
        </div>
        <hr className="border-slate-200 dark:border-slate-800 mx-4"/>
        <div className="flex items-center gap-4 bg-background-light dark:bg-background-dark px-4 min-h-14 py-2 justify-between">
          <div className="flex items-center gap-4">
            <div className="text-slate-800 dark:text-white flex items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-800 shrink-0 size-10">
              <span className="material-symbols-outlined text-2xl">all_inclusive</span>
            </div>
            <p className="text-slate-900 dark:text-white text-base font-normal leading-normal flex-1 truncate">Gapless Playback</p>
          </div>
          <div className="shrink-0">
            <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none bg-slate-300 dark:bg-slate-700 p-0.5 has-[:checked]:justify-end has-[:checked]:bg-primary">
              <div className="h-full w-[27px] rounded-full bg-white" style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 0px 3px 8px, rgba(0, 0, 0, 0.06) 0px 3px 1px' }}></div>
              <input className="invisible absolute" type="checkbox"/>
            </label>
          </div>
        </div>

        {/* NOTIFICATIONS Section */}
        <h3 className="text-slate-500 dark:text-slate-400 text-sm font-bold leading-tight tracking-wide px-4 pb-2 pt-6 uppercase">NOTIFICATIONS</h3>
        <div className="flex items-center gap-4 bg-background-light dark:bg-background-dark px-4 min-h-14 py-2 justify-between">
          <div className="flex items-center gap-4">
            <div className="text-slate-800 dark:text-white flex items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-800 shrink-0 size-10">
              <span className="material-symbols-outlined text-2xl">notifications_active</span>
            </div>
            <p className="text-slate-900 dark:text-white text-base font-normal leading-normal flex-1 truncate">Playback Notifications</p>
          </div>
          <div className="shrink-0">
            <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none bg-slate-300 dark:bg-slate-700 p-0.5 has-[:checked]:justify-end has-[:checked]:bg-primary">
              <div className="h-full w-[27px] rounded-full bg-white" style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 0px 3px 8px, rgba(0, 0, 0, 0.06) 0px 3px 1px' }}></div>
              <input checked className="invisible absolute" type="checkbox"/>
            </label>
          </div>
        </div>

        {/* ABOUT Section */}
        <h3 className="text-slate-500 dark:text-slate-400 text-sm font-bold leading-tight tracking-wide px-4 pb-2 pt-6 uppercase">ABOUT</h3>
        <div className="flex items-center gap-4 bg-background-light dark:bg-background-dark px-4 min-h-[72px] py-2">
          <div className="text-slate-800 dark:text-white flex items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-800 shrink-0 size-12">
            <span className="material-symbols-outlined text-2xl">info</span>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-slate-900 dark:text-white text-base font-medium leading-normal line-clamp-1">About Melody Flow</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal line-clamp-2">Version 1.0.0</p>
          </div>
        </div>
        <hr className="border-slate-200 dark:border-slate-800 mx-4"/>
        <div className="flex items-center gap-4 bg-background-light dark:bg-background-dark px-4 min-h-[72px] py-2">
          <div className="text-slate-800 dark:text-white flex items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-800 shrink-0 size-12">
            <span className="material-symbols-outlined text-2xl">feedback</span>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-slate-900 dark:text-white text-base font-medium leading-normal line-clamp-1">Send Feedback</p>
          </div>
        </div>
        <hr className="border-slate-200 dark:border-slate-800 mx-4"/>
        <div className="flex items-center gap-4 bg-background-light dark:bg-background-dark px-4 min-h-[72px] py-2">
          <div className="text-slate-800 dark:text-white flex items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-800 shrink-0 size-12">
            <span className="material-symbols-outlined text-2xl">star</span>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-slate-900 dark:text-white text-base font-medium leading-normal line-clamp-1">Rate the App</p>
          </div>
        </div>
        <div className="h-5 bg-background-light dark:bg-background-dark"></div>
      </div>
    </div>
  );
};

export default SettingsScreen;