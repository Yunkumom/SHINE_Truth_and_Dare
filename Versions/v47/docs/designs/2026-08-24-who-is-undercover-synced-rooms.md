# V47 Who Is the Undercover — Synchronized Rooms

## Approved direction

The owner delegated the product decision and authorized end-to-end implementation on 2026-08-24. V47 will add a fourth home experience, **Who Is the Undercover?**, using synchronized multi-phone rooms. A host creates a room, other players join through a six-character room code, QR code, or invitation link, and all devices follow the same lobby, reveal, discussion, voting, and result phases.

擁有者於 2026-08-24 授權由實作者決定產品方向並進行端到端實作。V47 將新增第四個首頁體驗「誰是臥底」，採用多支手機同步房間；房主建立房間，其他玩家可透過六碼房號、QR Code 或邀請連結加入，所有裝置同步大廳、身分揭示、描述討論、投票與結果階段。

## Product flow

1. **Entry:** The home screen and hamburger navigation expose the fourth experience in English, Traditional Chinese, and bilingual modes.
2. **Create or join:** A player creates a room or enters a six-character code. The host receives a QR code and shareable URL containing the room code.
3. **Private lobby:** Devices receive anonymous seats such as Player 1 and Player 2; no name, contact, birthday, answer, note, upload, or custom choice is transmitted.
4. **Start:** The host can start with 4–12 connected players. The game assigns one undercover for 4–7 players and two for 8–12 players.
5. **Reveal:** Each device privately reveals its own word and role. Civilians share one word and undercover players receive a related but different word.
6. **Discussion:** A synchronized speaker order is shown. Conversation happens face to face; no answer text or audio is uploaded.
7. **Vote:** Each active player votes privately for one other active player. The host advances after all votes arrive; a deterministic tie rule eliminates nobody and begins another round.
8. **Result:** Civilians win when every undercover player is eliminated; undercover wins when the number of undercover players is at least the number of civilians. The host can replay with the same room or return home.

## State and synchronization

- `UndercoverRoom` contains only public game state: room code, host UID, phase, anonymous seat order, alive state, round, speaker index, vote completion count, timestamps, and winning side.
- `UndercoverPrivatePlayer` is stored beneath a per-user private node and contains that user's role, word-pair identifier, displayed word side, and current vote.
- Firebase Anonymous Authentication supplies a per-device UID. Realtime Database listeners provide synchronized room updates.
- The host client is the phase coordinator and writes role assignments to private player nodes. This is an explicitly casual social-game trust boundary: a technically sophisticated host could inspect assignments, while ordinary players cannot read another player's private node.
- Rooms expire after two hours. Clients reject and stop displaying expired rooms.
- A lazy-loaded Firebase adapter keeps the existing offline modes independent; inability to connect shows a recoverable bilingual error instead of breaking the rest of V47.

## Privacy and security boundary

- The feature transmits no owner-defined privacy-sensitive personal fields and stores no persistent player profile.
- Root Realtime Database access remains denied. Rules allow authenticated room members to read public room state, each player to read only their private assignment, and the host to coordinate approved phase changes.
- Existing `rooms` and `letsTalkRooms` rules are preserved byte-for-byte in meaning; the deployment adds only the `undercoverRooms` and `undercoverPrivate` namespaces.
- Room codes exclude ambiguous characters and expire. QR codes are generated locally; no third-party QR service receives the URL.
- Analytics, telemetry, accounts, uploads, chat, and audio recording remain out of scope.

## Visual direction

The phone view uses the existing V47 warm parchment, espresso, and red-accent system. The lobby emphasizes one primary action per row, a large readable room code, a compact QR panel, and anonymous seat chips. Reveal uses a deliberate press-and-hold card to reduce accidental word exposure. Desktop showcase presents the same governed 430 × 932 experience at a larger scale rather than inventing a separate game flow.

## Acceptance criteria

- Four experiences appear on home, hamburger navigation, and desktop showcase.
- A real Firebase-hosted phone can create a room and a second phone can join using code or invitation URL.
- 4–12 players are enforced; role count and win rules are deterministic and unit tested.
- Words and votes are rendered only on the authorized player's device path.
- English is the default while English, Taiwan Traditional Chinese, and bilingual UI remain switchable.
- Existing keepsake, Truth or Dare, and Taiwan Food Journey flows remain available.
- Focused tests, build, scoped contract checks, and the repository validator are run with exact failures recorded.

