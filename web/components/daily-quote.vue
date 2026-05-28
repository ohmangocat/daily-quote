<script setup lang="ts">
import { computed, ref } from 'vue'
import { useMessage } from '@/hooks/useMessage.ts'

defineOptions({ name: 'DailyQuoteToolbar' })

interface QuoteItem {
  text: string
  source: string
}

const storageKey = 'xjlldw.daily-quote.favorites'
const message = useMessage()
const favorites = ref<QuoteItem[]>([])

const quotes: QuoteItem[] = [
  { text: '真正的稳定，是你在变化里也能找到自己的节奏。', source: '每日提醒' },
  { text: '今天不必赢过所有人，只要比昨天多前进一步。', source: '工作台便签' },
  { text: '把复杂的事情拆小，焦虑就会少一半。', source: '工程师语录' },
  { text: '别急着证明自己，先把手里的事做漂亮。', source: '清晨短句' },
  { text: '保持清醒，保持善意，也保持一点点锋利。', source: '夜间备忘' },
  { text: '好运有时不是突然降临，而是你一直没停。', source: '每日提醒' },
  { text: '真正有用的努力，往往安静得不像努力。', source: '工作台便签' },
  { text: '先完成，再优化；先行动，再等灵感。', source: '工程师语录' },
  { text: '慢一点没关系，方向对就会越来越近。', source: '清晨短句' },
  { text: '别让短暂的低潮，否定长期的成长。', source: '夜间备忘' },
  { text: '你已经走了很远，只是忙到忘了回头看。', source: '每日提醒' },
  { text: '把今天照顾好，明天会更愿意靠近你。', source: '工作台便签' },
]

function dayIndex() {
  const now = new Date()
  const seed = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
  return Array.from(seed).reduce((sum, char) => sum + char.charCodeAt(0), 0) % quotes.length
}

const currentIndex = ref(dayIndex())
const currentQuote = computed(() => quotes[currentIndex.value])
const shortText = computed(() => currentQuote.value.text.length > 18 ? `${currentQuote.value.text.slice(0, 18)}...` : currentQuote.value.text)

function loadFavorites() {
  try {
    const raw = localStorage.getItem(storageKey)
    favorites.value = raw ? JSON.parse(raw) : []
  }
  catch {
    favorites.value = []
  }
}

function saveFavorites() {
  localStorage.setItem(storageKey, JSON.stringify(favorites.value))
}

function nextQuote() {
  currentIndex.value = (currentIndex.value + 1) % quotes.length
}

async function copyQuote() {
  await navigator.clipboard.writeText(`${currentQuote.value.text} - ${currentQuote.value.source}`)
  message.success('已复制')
}

function favoriteQuote() {
  const exists = favorites.value.some(item => item.text === currentQuote.value.text)
  if (exists) {
    message.info('已在收藏里')
    return
  }
  favorites.value.unshift(currentQuote.value)
  favorites.value = favorites.value.slice(0, 8)
  saveFavorites()
  message.success('已收藏')
}

loadFavorites()
</script>

<template>
  <m-dropdown class="daily-quote-dropdown" :triggers="['click']" placement="bottom-end">
    <template #default>
      <button class="daily-quote-trigger" type="button" aria-label="每日鸡汤">
        <ma-svg-icon name="material-symbols:format-quote-rounded" size="17" />
        <span>{{ shortText }}</span>
      </button>
    </template>
    <template #popper>
      <div class="daily-quote-panel">
        <div class="quote-meta">
          <span>每日鸡汤</span>
          <el-tag size="small" effect="plain">
            {{ currentQuote.source }}
          </el-tag>
        </div>
        <p class="quote-text">
          {{ currentQuote.text }}
        </p>
        <div class="quote-actions">
          <el-button size="small" @click="nextQuote">
            <ma-svg-icon name="material-symbols:refresh-rounded" />
            换一句
          </el-button>
          <el-button size="small" @click="copyQuote">
            <ma-svg-icon name="material-symbols:content-copy-outline-rounded" />
            复制
          </el-button>
          <el-button size="small" type="primary" plain @click="favoriteQuote">
            <ma-svg-icon name="material-symbols:star-outline-rounded" />
            收藏
          </el-button>
        </div>
        <div v-if="favorites.length > 0" class="favorite-list">
          <div class="favorite-title">
            收藏
          </div>
          <div v-for="item in favorites" :key="item.text" class="favorite-item">
            {{ item.text }}
          </div>
        </div>
      </div>
    </template>
  </m-dropdown>
</template>

<style scoped>
.daily-quote-trigger {
  height: 30px;
  max-width: 260px;
  border: 1px solid var(--el-border-color-light);
  border-radius: 6px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--el-bg-color);
  color: var(--el-text-color-regular);
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}

.daily-quote-trigger:hover {
  border-color: var(--el-color-primary);
  color: var(--el-color-primary);
  background: var(--el-color-primary-light-9);
}

.daily-quote-trigger span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  line-height: 1;
}

.daily-quote-panel {
  width: 320px;
  padding: 14px;
}

.quote-meta,
.quote-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.quote-meta span {
  color: var(--el-text-color-primary);
  font-weight: 600;
}

.quote-text {
  margin: 12px 0 14px;
  color: var(--el-text-color-primary);
  font-size: 15px;
  line-height: 1.7;
}

.quote-actions {
  justify-content: flex-start;
  flex-wrap: wrap;
}

.favorite-list {
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid var(--el-border-color-lighter);
  display: grid;
  gap: 8px;
}

.favorite-title {
  color: var(--el-text-color-secondary);
  font-size: 12px;
}

.favorite-item {
  color: var(--el-text-color-regular);
  font-size: 12px;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 1024px) {
  .daily-quote-trigger {
    width: 32px;
    justify-content: center;
    padding: 0;
  }

  .daily-quote-trigger span {
    display: none;
  }
}
</style>
