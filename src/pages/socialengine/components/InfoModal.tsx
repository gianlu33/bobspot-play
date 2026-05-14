import { Info, X, ShieldAlert } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InfoModal({ isOpen, onClose }: InfoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-2xl bg-surface-800 border border-border-default rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-default bg-surface-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-500/10 rounded-lg">
              <Info className="w-6 h-6 text-primary-500" />
            </div>
            <h2 className="text-xl font-bold text-text-primary">About SocialEngine AI</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-surface-600 rounded-lg transition-colors text-text-muted hover:text-text-primary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[70vh] space-y-8">
          <section>
            <h3 className="text-lg font-semibold text-primary-400 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
              What is this game?
            </h3>
            <p className="text-text-secondary leading-relaxed">
              SocialEngine AI is a social engineering simulator where you play as a "hacker" who targets people instead of code. 
              Your goal is to convince AI Guardians to reveal restricted information through persuasion, role-play, and logical reasoning.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-primary-400 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
              How to Play
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 bg-surface-700/30 rounded-xl border border-border-default">
                <div className="font-bold text-text-primary mb-1">1. Choose a Level</div>
                <div className="text-sm text-text-muted">Each level has a unique Guardian persona and a secret you need to extract.</div>
              </div>
              <div className="p-4 bg-surface-700/30 rounded-xl border border-border-default">
                <div className="font-bold text-text-primary mb-1">2. Converse & Persuade</div>
                <div className="text-sm text-text-muted">Chat with the Guardian. Use specific roles, create urgency, or mention relevant keywords.</div>
              </div>
              <div className="p-4 bg-surface-700/30 rounded-xl border border-border-default">
                <div className="font-bold text-text-primary mb-1">3. Extract the Secret</div>
                <div className="text-sm text-text-muted">If you meet the hidden requirements, the Guardian will slip up and reveal the secret.</div>
              </div>
              <div className="p-4 bg-surface-700/30 rounded-xl border border-border-default">
                <div className="font-bold text-text-primary mb-1">4. Submit to Win</div>
                <div className="text-sm text-text-muted">Once you have the secret, enter it into the "Submit Secret" field to clear the level.</div>
              </div>
            </div>
          </section>

          <section className="p-4 bg-primary-500/5 rounded-xl border border-primary-500/20">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary-400 mb-2">Pro Tip</h3>
            <p className="text-sm text-text-secondary">
              The backend uses a multi-stage validation system. It tracks your <strong>Trust Level</strong> and the <strong>Role</strong> it thinks you are playing. 
              Keep an eye on the meters in the game screen for feedback!
            </p>
          </section>

          <section className="p-4 bg-red-500/5 rounded-xl border border-red-500/20">
            <div className="flex items-center gap-3 mb-2">
              <ShieldAlert className="w-5 h-5 text-red-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-red-400">Security Note</h3>
            </div>
            <p className="text-sm text-text-secondary">
              The system is equipped with advanced safeguards to prevent manipulation. 
              <strong> Prompt injection and similar technical attacks will not work. </strong> 
              Success depends entirely on your ability to role-play and use social engineering effectively.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border-default bg-surface-700/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-lg transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
      {/* Overlay click to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose}></div>
    </div>
  );
}
