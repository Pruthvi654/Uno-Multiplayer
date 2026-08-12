from pathlib import Path
p = Path('d:/uno-multiplayer/client/src/components/Game.jsx')
if not p.exists():
    print('MISSING')
else:
    s = p.read_text(encoding='utf-8-sig')
    p.write_text(s, encoding='utf-8')
    b = p.read_bytes()
    print('written', len(b), 'bytes; first3=', list(b[:3]))
