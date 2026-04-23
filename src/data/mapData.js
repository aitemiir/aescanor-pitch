// Demo operational map data — generic mid-market company.
// Drives OperationsMap: L1 clusters → L2 process steps → L3 BPMN flow.

export const mapData = {
  ru: {
    url: 'company-map.aescanor.com',
    breadcrumbRoot: 'Карта операций',
    back: 'Назад',
    title: 'Карта операций',
    tipHeader: 'Нажмите на узел для детализации',

    l1: {
      clusters: [
        {
          id: 'support',
          kind: 'support',
          label: 'Поддержка',
          nodes: [
            { id: 'hr', label: 'Кадры и зарплата', desc: '7 процессов · 4 инструмента' },
            { id: 'it', label: 'ИТ и безопасность', desc: '9 процессов · 6 инструментов' },
            { id: 'fin', label: 'Финансы и учёт', desc: '11 процессов · 3 инструмента' },
          ],
        },
        {
          id: 'mgmt',
          kind: 'mgmt',
          label: 'Управление',
          nodes: [
            { id: 'strat', label: 'Стратегия и PMO', desc: '6 процессов · 4 инструмента' },
          ],
        },
        {
          id: 'core',
          kind: 'core',
          label: 'Ключевые процессы',
          nodes: [
            { id: 'mkt', label: 'Маркетинг и лидогенерация', desc: '8 процессов · 7 инструментов' },
            { id: 'sales', label: 'Продажи и закрытие сделки', desc: '9 процессов · 5 инструментов', drilldown: true },
            { id: 'ops', label: 'Операции и выполнение', desc: '12 процессов · 6 инструментов' },
            { id: 'cs', label: 'Клиентский сервис', desc: '7 процессов · 4 инструмента' },
            { id: 'logistics', label: 'Логистика и склад', desc: '6 процессов · 3 инструмента' },
          ],
        },
      ],
      kpis: [
        { k: '50', v: 'сотрудников' },
        { k: '3', v: 'кластера' },
        { k: '75', v: 'процессов' },
      ],
      tip: 'Узел с пульсом — нажмите для детализации',
    },

    l2: {
      title: 'Продажи и закрытие сделки',
      description: '7 шагов от входящего лида до подписанного договора',
      tip: 'Узел с пульсом — точка для детализации',
      steps: [
        { id: 'qualify', label: 'Квалификация', desc: 'Определение ICP и бюджета' },
        { id: 'discovery', label: 'Discovery', desc: 'Сбор требований' },
        { id: 'demo', label: 'Демо', desc: 'Презентация продукта' },
        { id: 'quote', label: 'КП', desc: 'Коммерческое предложение' },
        { id: 'convert', label: 'Конверсия клиента', desc: 'Подготовка и согласование', drilldown: true, flag: 'AI-кандидат' },
        { id: 'negotiate', label: 'Переговоры', desc: 'Итоговые условия' },
        { id: 'sign', label: 'Подписание', desc: 'Закрытие сделки' },
      ],
    },

    l3: {
      title: 'Конверсия нового клиента',
      objective: 'Сократить цикл конверсии с 14 до 4 дней через автоматизацию квалификации и подготовки договоров.',
      labels: { objective: 'Цель', pains: 'Узкие места', tools: 'Инструменты' },
      pains: [
        'Ручная квалификация — до 6 часов на лид',
        'Задержки согласования договоров (3–5 дней)',
        'Нет единой истории по клиенту между менеджерами',
      ],
      tools: ['CRM', 'Email', 'Docs', '1C', 'Slack', 'Calendly'],
      flow: [
        { id: 'start', kind: 'start', label: 'Новый лид', x: 0, y: 1 },
        { id: 'qualify', kind: 'action', label: 'Квалификация', x: 1, y: 1 },
        { id: 'xor1', kind: 'xor', label: 'Готов?', x: 2, y: 1 },
        { id: 'demo', kind: 'action', label: 'Демо', x: 3, y: 0 },
        { id: 'quote', kind: 'action', label: 'КП', x: 4, y: 0 },
        { id: 'sign', kind: 'action', label: 'Подписание', x: 5, y: 0 },
        { id: 'endWin', kind: 'end', label: 'Закрыт', x: 6, y: 0 },
        { id: 'nurture', kind: 'action', label: 'Nurture', x: 3, y: 2 },
        { id: 'endNurt', kind: 'end', label: 'Отложен', x: 4, y: 2 },
      ],
      edges: [
        { from: 'start', to: 'qualify' },
        { from: 'qualify', to: 'xor1' },
        { from: 'xor1', to: 'demo', label: 'да' },
        { from: 'xor1', to: 'nurture', label: 'нет' },
        { from: 'demo', to: 'quote' },
        { from: 'quote', to: 'sign' },
        { from: 'sign', to: 'endWin' },
        { from: 'nurture', to: 'endNurt' },
      ],
    },

    footer: {
      updated: 'обновлено сегодня',
      pulse: 'Pulse active',
      live: 'Live',
    },
  },

  en: {
    url: 'company-map.aescanor.com',
    breadcrumbRoot: 'Operations map',
    back: 'Back',
    title: 'Operations map',
    tipHeader: 'Click a node to drill down',

    l1: {
      clusters: [
        {
          id: 'support',
          kind: 'support',
          label: 'Support',
          nodes: [
            { id: 'hr', label: 'HR & payroll', desc: '7 processes · 4 tools' },
            { id: 'it', label: 'IT & security', desc: '9 processes · 6 tools' },
            { id: 'fin', label: 'Finance & accounting', desc: '11 processes · 3 tools' },
          ],
        },
        {
          id: 'mgmt',
          kind: 'mgmt',
          label: 'Management',
          nodes: [
            { id: 'strat', label: 'Strategy & PMO', desc: '6 processes · 4 tools' },
          ],
        },
        {
          id: 'core',
          kind: 'core',
          label: 'Core processes',
          nodes: [
            { id: 'mkt', label: 'Marketing & lead gen', desc: '8 processes · 7 tools' },
            { id: 'sales', label: 'Sales & closing', desc: '9 processes · 5 tools', drilldown: true },
            { id: 'ops', label: 'Operations & delivery', desc: '12 processes · 6 tools' },
            { id: 'cs', label: 'Customer service', desc: '7 processes · 4 tools' },
            { id: 'logistics', label: 'Logistics & warehouse', desc: '6 processes · 3 tools' },
          ],
        },
      ],
      kpis: [
        { k: '50', v: 'employees' },
        { k: '3', v: 'clusters' },
        { k: '75', v: 'processes' },
      ],
      tip: 'The pulsing node can be drilled down',
    },

    l2: {
      title: 'Sales & closing',
      description: '7 steps from inbound lead to signed contract',
      tip: 'The pulsing node can be drilled down',
      steps: [
        { id: 'qualify', label: 'Qualify', desc: 'ICP and budget check' },
        { id: 'discovery', label: 'Discovery', desc: 'Requirements gathering' },
        { id: 'demo', label: 'Demo', desc: 'Product walkthrough' },
        { id: 'quote', label: 'Quote', desc: 'Commercial proposal' },
        { id: 'convert', label: 'Buyer conversion', desc: 'Prep & approvals', drilldown: true, flag: 'AI candidate' },
        { id: 'negotiate', label: 'Negotiate', desc: 'Final terms' },
        { id: 'sign', label: 'Sign', desc: 'Close the deal' },
      ],
    },

    l3: {
      title: 'New buyer conversion',
      objective: 'Cut the conversion cycle from 14 to 4 days via automated qualification and contract prep.',
      labels: { objective: 'Objective', pains: 'Pain points', tools: 'Tools' },
      pains: [
        'Manual qualification — up to 6h per lead',
        'Contract approval delays (3–5 days)',
        'No shared customer history across reps',
      ],
      tools: ['CRM', 'Email', 'Docs', 'ERP', 'Slack', 'Calendly'],
      flow: [
        { id: 'start', kind: 'start', label: 'New lead', x: 0, y: 1 },
        { id: 'qualify', kind: 'action', label: 'Qualify', x: 1, y: 1 },
        { id: 'xor1', kind: 'xor', label: 'Ready?', x: 2, y: 1 },
        { id: 'demo', kind: 'action', label: 'Demo', x: 3, y: 0 },
        { id: 'quote', kind: 'action', label: 'Quote', x: 4, y: 0 },
        { id: 'sign', kind: 'action', label: 'Sign', x: 5, y: 0 },
        { id: 'endWin', kind: 'end', label: 'Closed', x: 6, y: 0 },
        { id: 'nurture', kind: 'action', label: 'Nurture', x: 3, y: 2 },
        { id: 'endNurt', kind: 'end', label: 'Parked', x: 4, y: 2 },
      ],
      edges: [
        { from: 'start', to: 'qualify' },
        { from: 'qualify', to: 'xor1' },
        { from: 'xor1', to: 'demo', label: 'yes' },
        { from: 'xor1', to: 'nurture', label: 'no' },
        { from: 'demo', to: 'quote' },
        { from: 'quote', to: 'sign' },
        { from: 'sign', to: 'endWin' },
        { from: 'nurture', to: 'endNurt' },
      ],
    },

    footer: {
      updated: 'updated today',
      pulse: 'Pulse active',
      live: 'Live',
    },
  },
};
