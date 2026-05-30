// ページ読み込み時に onva.txt を取得する
        window.onload = async function () {
            const historyEl = document.getElementById('history-content');
            const loadingEl = document.getElementById('loading');
            const errorEl = document.getElementById('error-message');

            try {
                // fetch API を使用して外部ファイルを読み込む
                const response = await fetch('onva.txt');
                if (!response.ok) throw new Error('File not found');

                const text = await response.text();

                // コンテンツを流し込み、表示を切り替える
                historyEl.textContent = text;
                historyEl.classList.remove('hidden');
                loadingEl.classList.add('hidden');
            } catch (err) {
                loadingEl.classList.add('hidden');
                errorEl.classList.remove('hidden');
                console.error('Error loading onva.txt:', err);
            }
        };

        function downloadHistory() {
            const textContent = document.getElementById('history-content').textContent;
            if (!textContent) return;

            const blob = new Blob([textContent], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'onva.txt';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }
