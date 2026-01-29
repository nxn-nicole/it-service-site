import { ArrowUpRight } from "lucide-react";
import WeChatModal from "@/components/WeChatModal";
import XhsModal from "@/components/XhsModal";

export default function ContactPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] space-y-10 py-16">
      {/* Header */}
      <div className="text-center space-y-3 max-w-lg">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          联系我
        </h1>
        <p className="text-base text-white/50">
          选择你最方便的方式，随时联系咨询
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid gap-5 md:grid-cols-2 w-full max-w-2xl px-4">
        {/* WeChat Card */}
        <WeChatModal wechatId="Azdev0189">
          <div className="group relative rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-8 space-y-5 hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all duration-300 cursor-pointer">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <svg className="h-6 w-6 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.045c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.269-.03-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982z"/>
              </svg>
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">微信咨询</h2>
              <p className="text-sm text-white/50">扫码或搜索微信号添加好友</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors">
              打开微信二维码 <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </WeChatModal>

        {/* XHS Card */}
        <XhsModal profileUrl="https://www.xiaohongshu.com/user/profile/615c36cd0000000002023df7">
          <div className="group relative rounded-3xl border border-rose-500/20 bg-rose-500/5 p-8 space-y-5 hover:bg-rose-500/10 hover:border-rose-500/40 transition-all duration-300 cursor-pointer">
            <div className="h-12 w-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
              <svg className="h-6 w-6 text-rose-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.8 7.5h-1.2c-.1-.6-.4-1-1-1-.7 0-1.2.5-1.2 1.5v.5h2l-.3 2h-1.7v5h-2v-5H9.8v-2h1.6v-.7c0-1.8 1-2.8 2.7-2.8.8 0 1.4.1 1.7.1v1.4z"/>
              </svg>
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">小红书私信</h2>
              <p className="text-sm text-white/50">搜索「澳洲软件工程师」找到我</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-rose-400 group-hover:text-rose-300 transition-colors">
              查看小红书主页 <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </XhsModal>
      </div>

      {/* Tip */}
      <p className="text-xs text-white/30 text-center max-w-md">
        添加微信时请备注「咨询」，方便快速通过
      </p>
    </section>
  );
}
